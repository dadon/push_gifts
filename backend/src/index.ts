import dotenv from "dotenv";
dotenv.config();


import api from "./api";
import bot from "./bot";
import * as background from "./background";
import * as update_exchange_rate from "./background/update_exchange_rate";
import { sendSms } from "./external_api/sms";
import { getWalletMnemonic } from "./db/minter_wallet";
import { updateAllBalances } from "./db/balance";
import * as gift_card from "./db/gift_card";
import { GiftCard } from "./types";
import { setLastBlock } from "./db/background";


api(process.env.PORT || 3000);

if (process.env.BACKGROUND) {
    background.registerTasks();
}

if (process.env.SMS_TEST) {
    sendSms("+380951213669", "test message");
}

if (process.env.FORCE_BIP_PRICE) {
    update_exchange_rate.updateBipPrice();
}

if (process.env.FORCE_CURRENCY_RATES) {
    update_exchange_rate.updateCurrencyRates();
}

if (process.env.SHOW_MNEMONIC) {
    getWalletMnemonic(process.env.SHOW_MNEMONIC).then(res => console.log(res));
}

if (process.env.START_BOT) {
    bot();
}

if (process.env.CLEAR_BLOCK) {
    setLastBlock(parseInt(process.env.START_BLOCK))
}

if (process.env.FORCE_BALANCE) {
    updateAllBalances()
}

if (process.env.ADD_GIFT_CARD) {
    const split = process.env.ADD_GIFT_CARD.split(",");
    const giftCard: GiftCard = {
        spendType: split[0],
        code: split[1],
        priceUsd: parseFloat(split[2]),
    };
    if (split[3]) giftCard.link = split[3];
    if (split[4]) giftCard.group = split[4];
    gift_card.add(giftCard).then(el => gift_card.getAll().then(result => console.log(JSON.stringify(result))));
}

// (async () => {
// sendSmsTwillio("+380951213669", "test message with link " + "https://push.gifts/c/MQpIHy2r/8EuCmBxSUiMjxdl5");
// const res = await validatePhone("0951213669");
// console.log(res);
// })();

