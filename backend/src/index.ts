import dotenv from "dotenv";
dotenv.config();


import api from "./api";
import * as on_block from "./background/on_block";
import * as update_exchange_rate from "./background/update_exchange_rate";
import updateCampaignBalance from "./background/update_campaign_balance";
import coinConvert from "./background/coin_convert";
import { sendSms } from "./external_api/sms";



api(process.env.PORT || 9090);

if (process.env.BACKGROUND) {
    setInterval(() => {
        on_block.run([updateCampaignBalance, coinConvert]);
    }, 5 * 1000);

    setInterval(() => {
        update_exchange_rate.updateBipPrice();
    }, 5 * 60 * 1000);

    setInterval(() => {
        update_exchange_rate.updateCurrencyRates();
    }, 60 * 60 * 1000);
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

// (async () => {
    // sendSmsTwillio("+380951213669", "test message with link " + "https://push.gifts/c/MQpIHy2r/8EuCmBxSUiMjxdl5");
    // const res = await validatePhone("0951213669");
    // console.log(res);
// })();
