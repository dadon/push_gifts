import rdb from "./rdb";
import { generateId, sha256 } from "../utils";
import { getCampaign, getCampaignByPublicId, getCampaignPublic, saveCampaign } from "./campaign";
import {
    CampaignType,
    CoinConvertRecord,
    PublicWallet,
    PublicWalletSpendData,
    Wallet,
    PushWalletSpend,
    WalletCreateData, LocaleInfo, GiftCard,
} from "../types";
import { sendMail } from "../external_api/email";
import { sdk, sellCoins, sendCoins } from "../external_api/minter";
import { getWalletKey } from "./minter_wallet";
import { sendSms } from "../external_api/sms";
import { addRecord } from "./coin_convert";
import { getBipPrice, getCoinPrice } from "./background";
import { getTypes } from "./spend_type";
import * as gift_card from "./gift_card";


const USER_ID_LEN = 8;

export async function createWallet(data: WalletCreateData) {
    const campaign = await getCampaignByPublicId(data.campaignPublicId);
    if (!campaign) {
        throw "Invalid campaign";
    }

    let walletId = null;

    if (data.email) {
        walletId = await getWalletIdByCredentials(campaign.campaignPublicId, data.email);
    }

    if (data.phone) {
        walletId = await getWalletIdByCredentials(campaign.campaignPublicId, data.phone);
    }

    if (!walletId) {
        walletId = generateId(USER_ID_LEN);
    }

    let wallet: Wallet = await getWallet(walletId);

    console.log("createUser", wallet);

    if (!wallet) {
        wallet = {
            walletId: walletId,
            campaignId: campaign.campaignId,
            balance: campaign.rewardPerUser,
            created: Date.now(),
            active: false,
            localeInfo: data.localeInfo,
            navigator: data.navigator,
        };

        if (data.email) {
            wallet.email = data.email;
            await setWalletIdByCredentials(campaign.campaignPublicId, data.email, walletId);
        }

        if (data.phone) {
            wallet.phone = data.phone;
            await setWalletIdByCredentials(campaign.campaignPublicId, data.phone, walletId);
        }

        if (data.uid) {
            wallet.uid = data.uid;
        }

        await saveWallet(wallet);
    }

    const privateUrl = `${process.env.SITE_URL}/w-${walletId}`;

    if (data.phone) {
        // TODO: validate phone
        const res = await sendSms(data.phone, `Here is a push wallet for you:\n${privateUrl}\nIt's a universal web gift card, that you can spend on mobile refills or digital gift cards`);
        console.log(res);
    } else if (data.email) {
        // TODO: validate email
        sendMail(
            data.email,
            `Get your ${campaign.rewardPerUser} ${campaign.coin}`,
            `Get your ${campaign.rewardPerUser} ${campaign.coin} - ${privateUrl}`);
    }
}

export async function createWalletSingle(campaignId: string): Promise<string> {
    const walletId = generateId(USER_ID_LEN);

    const wallet: Wallet = {
        walletId: walletId,
        campaignId: campaignId,
        balance: 0,
        created: Date.now(),
        active: true,
    };

    await saveWallet(wallet);

    return walletId;
}

export async function getWallet(walletId: string): Promise<Wallet> {
    const wallet = await rdb.getData(rdb.buildKey("user", walletId));
    if (!wallet) return null;
    await activateWallet(wallet);
    return wallet;
}

export async function getPublicWallet(walletId: string, localeData: LocaleInfo): Promise<PublicWallet> {
    const wallet: Wallet = await getWallet(walletId);
    if (wallet) {
        const publicWallet: PublicWallet = {
            walletId: walletId,
            balance: wallet.balance,
        };

        if (wallet.phone) publicWallet.phone = wallet.phone;
        if (wallet.email) publicWallet.email = wallet.email;

        if (wallet.campaignId) {
            const campaign = await getCampaign(wallet.campaignId);
            console.log("wallet", wallet.campaignId, campaign.balance);

            if (campaign.type === CampaignType.Single) {
                publicWallet.balance = campaign.balance;

                if (campaign.sendFrom && !campaign.sendFrom.txHash) {
                    campaign.sendFrom.txHash = await sendCoins(
                        await getWalletKey(campaign.sendFrom.address),
                        {
                            to: campaign.address,
                            coin: campaign.coin,
                            amount: campaign.sendFrom.amount,
                        }, campaign.coin
                    );

                    await saveCampaign(campaign);
                }
            }

            if (campaign.password) {
                publicWallet.passwordHash = sha256(campaign.password);
            }

            publicWallet.campaign = await getCampaignPublic(campaign, localeData);
        }

        return publicWallet;
    }

    return null;
}

export async function spend(walletId: string, data: PublicWalletSpendData) {
    const wallet: Wallet = await getWallet(walletId);

    const campaign = await getCampaign(wallet.campaignId);

    if (campaign.password && campaign.password !== data.password) {
        throw "Error. Invalid password";
    }

    let balance = wallet.balance;

    if (campaign.type === CampaignType.Single) {
        balance = campaign.balance;
    }

    if (balance <= 0) {
        throw "Error. Zero balance";
    }

    const spendTypes = await getTypes();
    const isGiftCard = spendTypes.spendTypesMap[data.type].giftCard;
    if (isGiftCard) {
        const giftCard: GiftCard = spendTypes.giftCardsMap[data.type];

        const bipToUsd = await getBipPrice();
        const usdPrice = bipToUsd * (campaign.coinToBip || 1);
        data.amount = giftCard.priceUsd / usdPrice + giftCard.priceUsd / usdPrice * 0.2;
    }

    if (!data.amount) data.amount = balance;

    if (campaign.balance < data.amount) {
        throw "Error. Invalid balance";
    }

    if (data.amount > balance) data.amount = balance;

    let txHash = null;

    const walletKey = await getWalletKey(campaign.address);

    let bipInCoin = 1;
    if (campaign.coin !== process.env.CHAIN_COIN) {
        const coinPrice = await getCoinPrice(campaign.coin);
        if (coinPrice) bipInCoin = coinPrice;
    }

    if (data.convert && campaign.coin !== process.env.CHAIN_COIN) {
        let fee = bipInCoin * 0.15;
        if (data.payload) {
            fee += bipInCoin * 0.015 * data.payload.length;
        }

        let amount = data.amount - fee;

        txHash = await sellCoins(walletKey, {
            coinFrom: campaign.coin,
            coinTo: process.env.CHAIN_COIN,
            amount: amount,
        }, campaign.coin);

        if (!txHash) {
            throw "Error. Sell coins fail";
        }

        const result = await sdk.estimateCoinSell({
            coinToSell: campaign.coin,
            coinToBuy: process.env.CHAIN_COIN,
            valueToSell: amount.toString(),
        });

        const willGet = parseFloat(result.will_get);

        const convertRec: CoinConvertRecord = {
            convertId: generateId(8),
            addressFrom: campaign.address,
            addressTo: data.toAddress,
            coinTo: process.env.CHAIN_COIN,
            coinFrom: campaign.coin,
            convertHash: txHash,
            payload: data.payload,
            amount: willGet,
        };

        await addRecord(convertRec);
    } else {
        let fee = bipInCoin * 0.01;
        if (data.payload) {
            fee += bipInCoin * 0.01 * data.payload.length;
        }

        console.log("send amount: ", data.amount);

        txHash = await sendCoins(walletKey, {
            to: data.toAddress,
            amount: data.amount - fee,
            coin: campaign.coin,
        }, campaign.coin, data.payload);

        if (!txHash) {
            throw "Error. Send coins fail";
        }
    }

    if (!wallet.spendRecords) {
        wallet.spendRecords = [];
    }

    const rec: PushWalletSpend = {
        addressTo: data.toAddress,
        type: data.type,
        payload: data.payload,
        amount: data.amount,
        txHash: txHash,
    };

    campaign.balance -= data.amount;

    if (campaign.type !== CampaignType.Single) {
        wallet.balance -= data.amount;
    }

    wallet.spendRecords.push(rec);

    await saveCampaign(campaign);
    await saveWallet(wallet);

    if (isGiftCard) {
        const giftCard: GiftCard = spendTypes.giftCardsMap[data.type];
        giftCard.userId = wallet.walletId;
        giftCard.sellTime = Date.now();
        await gift_card.save(giftCard);
        return {
            code: giftCard.code,
            link: giftCard.link,
        };
    }

    return true;
}

function saveWallet(wallet: Wallet) {
    return rdb.setData(rdb.buildKey("user", wallet.walletId), wallet);
}

function getWalletIdByCredentials(campaignId: string, credentials: string): Promise<string> {
    return rdb.get(rdb.buildKey("userIdByCredentials", campaignId, credentials));
}

function setWalletIdByCredentials(campaignId: string, credentials: string, walletId: string): Promise<void> {
    return rdb.set(rdb.buildKey("userIdByCredentials", campaignId, credentials), walletId);
}

async function activateWallet(wallet: Wallet) {
    if (!wallet.active) {
        wallet.active = true;
        await rdb.rpush(rdb.buildKey("campaignUsers", wallet.campaignId), wallet.walletId);
        await saveWallet(wallet);
    }
}
