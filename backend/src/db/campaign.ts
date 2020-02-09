import rdb from "./rdb";

import { generateId } from "../utils";
import { createWallet } from "./wallet";
import { Campaign, CampaignRefill, CampaignStat, CampaignType } from "../types";
import { getBipPrice, getCurrencyRate } from "./background";
import * as minter from "../external_api/minter";
import { createUserSingle } from "./user";


export const CAMPAIGN_ID_LEN = 8;

const CAMPAIGN_PUBLIC_FIELDS = [
    "campaignPublicId",
    "rewardPerUser",
    "coin",
    "name",
    "brandName",
    "coinToBip",
    "type",
];

export async function createCampaign(uid: string, type?: CampaignType): Promise<Campaign> {
    const campaignId = generateId(CAMPAIGN_ID_LEN);
    const wallet = await createWallet();

    const campaign: Campaign = {
        campaignId: campaignId,
        type: type || CampaignType.Mass,
        campaignPublicId: generateId(CAMPAIGN_ID_LEN),
        address: wallet.address,
        balance: 0,
        rewardPerUser: 0,
        created: Date.now(),
    };

    if (campaign.type === CampaignType.Single) {
        campaign.recipientId = await createUserSingle(campaignId);
    }

    await updateCampaignUsdRate(campaign);

    await saveCampaign(campaign);
    await rdb.set(rdb.buildKey("campaignPublic", campaign.campaignPublicId), campaignId);
    await rdb.rpush(rdb.buildKey("campaigns"), campaignId);

    if (uid) {
        await rdb.sadd(rdb.buildKey("uidCampaigns", uid), campaignId);
    }

    return campaign;
}

export function getCampaign(campaignId: string): Promise<Campaign> {
    if (!campaignId || campaignId.length !== CAMPAIGN_ID_LEN) return null;
    return rdb.getData(rdb.buildKey("campaign", campaignId));
}


export async function getCampaignPublic(campaign: Campaign, localeData: object): Promise<object> {
    const campaignClean = {};

    for (let f of CAMPAIGN_PUBLIC_FIELDS) {
        campaignClean[f] = campaign[f];
    }

    campaignClean["runOutOfGifts"] = campaign.balance < campaign.rewardPerUser;
    campaignClean["active"] = campaign.balance > 0 && campaign.coin;

    campaignClean["priceData"] = await calculateCoinPrice(campaign, localeData);

    return campaignClean;
}

export async function getCampaignPublicById(campaignPublicId: string, localeData: object): Promise<object> {
    const campaign = await getCampaignByPublicId(campaignPublicId);

    if (campaign) {
        return await getCampaignPublic(campaign, localeData);
    }

    return null;
}

export async function updateCampaign(campaignId: string, campaignData: object) {
    const campaign = await getCampaign(campaignId);

    console.log("campaignData", campaignData);
    if (campaignData["name"]) {
        campaign.name = campaignData["name"];
    }

    if (campaignData["brandName"]) {
        campaign.brandName = campaignData["brandName"];
    }

    if (campaignData["rewardPerUser"]) {
        campaign.rewardPerUser = campaignData["rewardPerUser"];
    }

    if (campaignData["giftNum"]) {
        campaign.giftNum = campaignData["giftNum"];
    }

    if (campaignData["password"]) {
        campaign.password = campaignData["password"];
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

export async function getCampaignsByUID(uid: string): Promise<Campaign[]> {
    let campaignIds = await rdb.smembers(rdb.buildKey("uidCampaigns", uid));
    if (!campaignIds) return null;

    const result = [];
    for (let campaignId of campaignIds) {
        const campaign = await getCampaign(campaignId);
        result.push(campaign);
    }

    return result;
}

export async function calculateStat(campaigns: Campaign[]) {
    for (let campaign of campaigns) {
        const stat: CampaignStat = {
            visitorNum: 0,
            usersNum: 0,
        };
        let visitors = await rdb.smembers(rdb.buildKey("campaignVisitors", campaign.campaignPublicId));
        if (visitors) {
            stat.visitorNum = visitors.length;
        }
        const userIds = await rdb.getList(rdb.buildKey("campaignUsers", campaign.campaignId));
        if (userIds) {
            stat.usersNum = userIds.length;
        }

        campaign.stat = stat;
    }
}

export async function checkRefillTx(txHash: string): Promise<Boolean> {
    return;
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
    campaign.waitForRefill = checkWaitForRefill(campaign);
    console.log("saveCampaign", campaign);
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

export async function addCampaignVisitor(campaignId: string, uid: string) {
    return rdb.sadd(rdb.buildKey("campaignVisitors", campaignId), uid);
}

function checkWaitForRefill(campaign: Campaign): boolean {
    if (campaign.type === CampaignType.Mass) {
        if (campaign.rewardPerUser && campaign.giftNum) {
            return campaign.balance < campaign.rewardPerUser * campaign.giftNum;
        }
    }

    return false;
}
