import * as on_block from "./on_block";
import updateCampaignBalance from "./update_campaign_balance";
import coinConvert from "./coin_convert";
import * as update_exchange_rate from "./update_exchange_rate";
import { createTask } from "../utils/task";


export function registerTasks() {
    createTask(
        "block",
        async () => on_block.run([updateCampaignBalance, coinConvert]),
        5 * 1000);


    if (process.env.UPDATE_RATE) {
        createTask(
            "updateBipPrice",
            update_exchange_rate.updateBipPrice,
            5 * 60 * 1000);

        createTask(
            "updateBipPrice",
            update_exchange_rate.updateCurrencyRates,
            60 * 60 * 1000);
    }
}
