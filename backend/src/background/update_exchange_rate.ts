import * as exchange_rate from "../external_api/exchange_rate";
import * as db from "../db/background";


export async function updateBipPrice() {
    const bipPrice = await exchange_rate.getBipUsdPrice();
    if (bipPrice) {
        await db.setBipPrice(bipPrice);
    }
}

export async function updateCurrencyRates() {
    const currencyRates = await exchange_rate.getCurrencyRates();
    if (currencyRates) {
        await db.setCurrencyRate(currencyRates);
    }
}
