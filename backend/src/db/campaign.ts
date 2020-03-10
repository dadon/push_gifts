import rdb from "./rdb";

import { generateId } from "../utils";
import { createWallet } from "./minter_wallet";
import {
    Campaign,
    CampaignCreateData,
    CampaignEditableData,
    CampaignStat,
    CampaignType,
    LocaleInfo,
    PriceInfo,
    PublicCampaign,
    Wallet,
} from "../types";
import { getBipPrice, getCurrencyRate } from "./background";
import * as minter from "../external_api/minter";
import { createWalletSingle, getWallet } from "./wallet";


export const CAMPAIGN_ID_LEN = 8;

export async function createCampaign(data: CampaignCreateData): Promise<Campaign> {
    const campaignId = generateId(CAMPAIGN_ID_LEN);
    const wallet = await createWallet();

    const campaign: Campaign = {
        campaignId: campaignId,
        type: data.type,
        campaignPublicId: generateId(CAMPAIGN_ID_LEN),
        address: wallet.address,
        balance: data.balance || 0,
        rewardPerUser: 0,
        created: Date.now(),
    };

    if (data.coin) {
        campaign.coin = data.coin;
    }

    if (campaign.type === CampaignType.Single) {
        campaign.recipientId = await createWalletSingle(campaignId);

        if (data.sendFrom) {
            campaign.sendFrom = data.sendFrom;
        }
    }

    if (data.data) {
        _updateCampaign(campaign, data.data);
    }

    await updateCampaignUsdRate(campaign);

    await saveCampaign(campaign);
    await rdb.set(rdb.buildKey("campaignPublic", campaign.campaignPublicId), campaignId);
    await rdb.rpush(rdb.buildKey("campaigns"), campaignId);

    if (data.uid) {
        await rdb.sadd(rdb.buildKey("uidCampaigns", data.uid), campaignId);
    }

    setCampaignUrl(campaign);

    return campaign;
}

function _updateCampaign(campaign: Campaign, data: CampaignEditableData) {
    if (data.name) campaign.name = data.name;
    if (data.brandName) campaign.brandName = data.brandName;
    if (data.rewardPerUser) campaign.rewardPerUser = data.rewardPerUser;
    if (data.giftNum) campaign.giftNum = data.giftNum;
    if (data.password) campaign.password = data.password;
    if (data.passwordHint) campaign.passwordHint = data.passwordHint;
}

export async function updateCampaign(campaignId: string, data: CampaignEditableData) {
    const campaign = await getCampaign(campaignId);

    _updateCampaign(campaign, data);

    await updateCampaignUsdRate(campaign);
    await saveCampaign(campaign);
}

function setCampaignUrl(campaign: Campaign) {
    let endpoint = campaign.type === CampaignType.Single ? `w-${campaign.recipientId}` : `c-${campaign.campaignPublicId}`;
    campaign.url = `${process.env.SITE_URL}/${endpoint}`;
}

export async function getCampaign(campaignId: string): Promise<Campaign> {
    if (!campaignId || campaignId.length !== CAMPAIGN_ID_LEN) return null;
    const campaign: Campaign = await rdb.getData(rdb.buildKey("campaign", campaignId));

    setCampaignUrl(campaign);

    return campaign;
}


export async function getCampaignPublic(campaign: Campaign, localeData: LocaleInfo): Promise<PublicCampaign> {
    const publicLink: PublicCampaign = {
        campaignPublicId: campaign.campaignPublicId,
        type: campaign.type,
        rewardPerUser: campaign.rewardPerUser,
        coin: campaign.coin,
        name: campaign.name,
        brandName: campaign.brandName,
        coinToBip: campaign.coinToBip,
        passwordHint: campaign.passwordHint,
    };

    publicLink.runOutOfGifts = campaign.balance < campaign.rewardPerUser;
    publicLink.active = Boolean(campaign.balance > 0 && campaign.coin);
    publicLink.priceInfo = await calculateCoinPrice(campaign, localeData);

    return publicLink;
}

export async function getCampaignPublicById(campaignPublicId: string, localeData: LocaleInfo): Promise<PublicCampaign> {
    const campaign = await getCampaignByPublicId(campaignPublicId);

    if (campaign) {
        return await getCampaignPublic(campaign, localeData);
    }

    return null;
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

export async function calculateCoinPrice(campaign: Campaign, localeData: LocaleInfo): Promise<PriceInfo> {
    const bipToUsd = await getBipPrice();
    const usdPrice = bipToUsd * (campaign.coinToBip || 1);

    const result = {
        currency: "USD",
        price: usdPrice,
        priceUsd: usdPrice,
    };

    if (localeData && localeData["currency"] && localeData["currency"] !== "USD") {
        const currencyRates = await getCurrencyRate();
        if (currencyRates && currencyRates["rates"] && currencyRates["rates"][localeData["currency"]]) {
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

export async function getCampaignWallets(campaignId: string): Promise<Wallet[]> {
    const walletIds = await rdb.getList(rdb.buildKey("campaignUsers", campaignId));
    if (!walletIds || !walletIds.length) return [];
    const wallets = [];
    for (let walletId of walletIds) {
        const wallet = await getWallet(walletId);
        wallets.push(wallet);
    }
    return wallets;
}
