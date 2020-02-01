import rdb from "./rdb";
import { generateId } from "../utils";
import { getCampaign, getCampaignByPublicId, saveCampaign } from "./campaign";
import { CoinConvertRecord, User, UserSpend } from "../types";
import { sendMail } from "../external_api/email";
import { buyCoins, sellCoins, sendCoins, sdk } from "../external_api/minter";
import { getWalletKey } from "./wallet";
import { sendSms } from "../external_api/sms";
import { addRecord } from "./coin_convert";


const USER_PUBLIC_FIELDS = [
    "userId",
    "balance",
    "email",
    "phone",
];

const USER_ID_LEN = 16;

export async function createUser(campaignPublicId: string, userInfo: any) {
    const campaign = await getCampaignByPublicId(campaignPublicId);
    if (!campaign) {
        throw "Invalid campaign";
    }

    let userId = null;

    if (userInfo.email) {
        userId = await getUserIdByCredentials(campaign.campaignPublicId, userInfo.email);
    }

    if (userInfo.phone) {
        userId = await getUserIdByCredentials(campaign.campaignPublicId, userInfo.phone);
    }

    if (!userId) {
        userId = generateId(USER_ID_LEN);
    }

    let user: User = await getUser(userId);

    console.log('createUser', user);

    if (!user) {
        user = {
            userId: userId,
            campaignId: campaign.campaignId,
            balance: campaign.rewardPerUser,
            created: Date.now(),
            active: false,
            userLocale: userInfo.userLocale,
            navigator: userInfo.navigator,
        };

        if (userInfo.email) {
            user.email = userInfo.email;
            await setUserIdByCredentials(campaign.campaignPublicId, userInfo.email, userId);
        }

        if (userInfo.phone) {
            user.phone = userInfo.phone;
            await setUserIdByCredentials(campaign.campaignPublicId, userInfo.phone, userId);
        }

        await saveUser(user);
    }

    const privateUrl = `${process.env.SITE_URL}/c/${campaignPublicId}/${userId}`;

    if (userInfo.phone) {
        console.log('userInfo.phone', userInfo.phone);
        // TODO: validate phone
        const res = await sendSms(userInfo.phone, `Get your ${campaign.rewardPerUser} ${campaign.coin} - ${privateUrl}`);
        console.log(res);
    } else if (userInfo.email) {
        // TODO: validate email
        sendMail(
            userInfo.email,
            `Get your ${campaign.rewardPerUser} ${campaign.coin}`,
            `Get your ${campaign.rewardPerUser} ${campaign.coin} - ${privateUrl}`);
    }
}

export async function getUser(userId: string) {
    const user = await rdb.getData(rdb.buildKey("user", userId));
    if (!user) return null;
    await activateUser(user);
    return user;
}

export async function getUserPublicFields(userId: string) {
    const user = await getUser(userId);
    if (user) {
        const userPublic = {};
        for (let f of USER_PUBLIC_FIELDS) {
            userPublic[f] = user[f];
        }
        return userPublic;
    }
    return null;
}

export async function spend(userId: string, type: string, toAddress: string, amount: number, payload?: string) {
    const user: User = await getUser(userId);

    if (amount > user.balance) amount = user.balance;
    if (user.balance <= 0) return false;

    const campaign = await getCampaign(user.campaignId);

    if (campaign.balance < amount) return false;

    let txHash = null;

    const walletKey = await getWalletKey(campaign.address);

    if (type === "bip2phone" && campaign.coin !== process.env.CHAIN_COIN) {

        txHash = await sellCoins(walletKey, {
            coinFrom: campaign.coin,
            coinTo: process.env.CHAIN_COIN,
            amount: amount,
        }, campaign.coin);

        if (!txHash) return false;

        const result = await sdk.estimateCoinSell({
            coinToSell: campaign.coin,
            coinToBuy: process.env.CHAIN_COIN,
            valueToSell: amount.toString(),
        });

        const willGet = parseFloat(result.will_get);

        const convertRec: CoinConvertRecord = {
            convertId: generateId(8),
            addressFrom: campaign.address,
            addressTo: toAddress,
            coinTo: process.env.CHAIN_COIN,
            coinFrom: campaign.coin,
            convertHash: txHash,
            payload: payload,
            amount: willGet
        };

        await addRecord(convertRec);

    } else {
        txHash = await sendCoins(walletKey, {
            to: toAddress,
            amount: amount,
            coin: campaign.coin,
        }, campaign.coin, payload);

        if (!txHash) return false;
    }

    if (!user.spendRecords) {
        user.spendRecords = [];
    }

    const rec: UserSpend = {
        addressTo: toAddress,
        type: type,
        payload: payload,
        amount: amount,
        txHash: txHash,
    };

    campaign.balance -= amount;
    user.balance -= amount;

    user.spendRecords.push(rec);

    await saveCampaign(campaign);
    await saveUser(user);

    return true;
}

function saveUser(user: User) {
    return rdb.setData(rdb.buildKey("user", user.userId), user);
}

function getUserIdByCredentials(campaignId: string, credentials: string): Promise<string> {
    return rdb.get(rdb.buildKey("userIdByCredentials", campaignId, credentials));
}

function setUserIdByCredentials(campaignId: string, credentials: string, userId: string): Promise<void> {
    return rdb.set(rdb.buildKey("userIdByCredentials", campaignId, credentials), userId);
}

async function activateUser(user: User) {
    if (!user.active) {
        user.active = true;
        await rdb.rpush(rdb.buildKey("campaignUsers", user.campaignId), user.userId);
        await saveUser(user);
    }
}

export async function getCampaignUsers(campaignId: string) {
    const userIds = await rdb.getList(rdb.buildKey("campaignUsers", campaignId));
    if (!userIds || !userIds.length) return [];
    const users = [];
    for (let userId of userIds) {
        const user = await getUser(userId);
        users.push(user);
    }
    return users;
}
