import dotenv from "dotenv";
dotenv.config();


import api from "./api";
import * as background from "./background";
import * as update_exchange_rate from "./background/update_exchange_rate";
import { sendSms } from "./external_api/sms";


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

// (async () => {
// sendSmsTwillio("+380951213669", "test message with link " + "https://push.gifts/c/MQpIHy2r/8EuCmBxSUiMjxdl5");
// const res = await validatePhone("0951213669");
// console.log(res);
// })();
