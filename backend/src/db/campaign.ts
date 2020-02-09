import rdb from "./rdb";

import { generateId } from "../utils";
import { createWallet } from "./wallet";
import { Campaign, CampaignRefill } from "../types";
import { getBipPrice, getCurrencyRate } from "./background";
import * as minter from "../external_api/minter";


export const CAMPAIGN_ID_LEN = 8;

const CAMPAIGN_PUBLIC_FIELDS = [
    "campaignPublicId",
    "rewardPerUser",
    "coin",
    "name",
    "brandName",
    "coinToBip",
];

export async function createCampaign(): Promise<Campaign> {
    const campaignId = generateId(CAMPAIGN_ID_LEN);
    const wallet = await createWallet();

    const campaign: Campaign = {
        campaignId: campaignId,
        campaignPublicId: generateId(CAMPAIGN_ID_LEN),
        address: wallet.address,
        balance: 0,
        rewardPerUser: 0,
        created: Date.now(),
    };

    await updateCampaignUsdRate(campaign);

    await saveCampaign(campaign);
    await rdb.set(rdb.buildKey("campaignPublic", campaign.campaignPublicId), campaignId);
    await rdb.rpush(rdb.buildKey("campaigns"), campaignId);

    return campaign;
}

export function getCampaign(campaignId: string): Promise<Campaign> {
    if (!campaignId || campaignId.length !== CAMPAIGN_ID_LEN) return null;
    return rdb.getData(rdb.buildKey("campaign", campaignId));
}

export async function getCampaignPublic(campaignPublicId: string, localeData: object): Promise<object> {
    const campaign = await getCampaignByPublicId(campaignPublicId);

    if (campaign) {
        const campaignClean = {};

        for (let f of CAMPAIGN_PUBLIC_FIELDS) {
            campaignClean[f] = campaign[f];
        }

        campaignClean["runOutOfGifts"] = campaign.balance < campaign.rewardPerUser * 2;

        campaignClean["priceData"] = await calculateCoinPrice(campaign, localeData);

        return campaignClean;
    }

    return null;
}

export async function updateCampaign(campaignId: string, campaignData: object) {
    const campaign = await getCampaign(campaignId);

    const name = campaignData["name"];
    if (name && name.length > 0) {
        campaign.name = name;
    }

    const rewardPerUser = campaignData["rewardPerUser"];
    if (rewardPerUser !== undefined) {
        campaign.rewardPerUser = rewardPerUser;
    }

    if (campaignData["brandName"]) {
        campaign.brandName = campaignData["brandName"];
    }

    await updateCampaignUsdRate(campaign);
    await saveCampaign(campaign);
}

export async function getCampaignByPublicId(campaignPublicId: string): Promise<Campaign> {
    const campaignId = await rdb.get(rdb.buildKey("campaignPublic", campaignPublicId));
    if (!campaignId) return null;

    return getCampaign(campaignId);
}

export async function getAllCampaigns(): Promise<Campaign[]> {
    const campaignIds = await rdb.getList(rdb.buildKey("campaigns"));
    const campaigns: Campaign[] = [];
    for (let campaignId of campaignIds) {
        const campaign = await rdb.getData(rdb.buildKey("campaign", campaignId));
        if (campaign) campaigns.push(campaign);
    }
    return campaigns;
}

export async function checkRefillTx(txHash: string): Promise<Boolean> {
    return
}

export async function addRefillTx(campaign: Campaign, txHash: string, amount: number, coin: string, from: string): Promise<Boolean> {
    console.log("addRefillTx", amount);
    const exist = await checkRefillTx(txHash);
    if (exist) {
        console.log(`tx ${txHash} is already processed`);
        return;
    }

    if (!campaign.balance && !campaign.coin) {
        campaign.coin = coin;
    }

    if (campaign.coin === coin) {
        campaign.balance += amount;
    }

    await updateCampaignUsdRate(campaign);

    await saveCampaign(campaign);

    const tx: CampaignRefill = {
        campaignId: campaign.campaignId,
        txHash: txHash,
        txFrom: from,
        amount: amount,
        coin: coin,
        created: Date.now(),
    };

    await rdb.setData(rdb.buildKey("refillTx", txHash), tx);
}

export function saveCampaign(campaign: Campaign) {
    return rdb.setData(rdb.buildKey("campaign", campaign.campaignId), campaign);
}

async function updateCampaignUsdRate(campaign: Campaign) {
    let coinInBip = 1;
    const coin = campaign.coin || process.env.CHAIN_COIN;
    if (coin !== process.env.CHAIN_COIN) {
        try {
            const result = await minter.sdk.estimateCoinSell({
                coinToSell: coin,
                valueToSell: 1,
                coinToBuy: process.env.CHAIN_COIN,
            });

            coinInBip = result["will_get"];
        } catch (e) {
            console.error("updateCampaignUsdRate error - error during estimateCoinSell");
            return;
        }
    }

    campaign.coinToBip = coinInBip;
}

export async function calculateCoinPrice(campaign: Campaign, localeData: object) {
    const bipToUsd = await getBipPrice();
    const usdPrice = bipToUsd * (campaign.coinToBip || 1);

    const result = {
        currency: "USD",
        price: usdPrice,
    };

    if (localeData && localeData["currency"] && localeData["currency"] !== "USD") {
        const currencyRates = await getCurrencyRate();
        if (currencyRates["rates"] && currencyRates["rates"][localeData["currency"]]) {
            const localPrice = usdPrice * currencyRates["rates"][localeData["currency"]];
            result.currency = localeData["currency"];
            result.price = localPrice;
        }
    }

    return result;
}
