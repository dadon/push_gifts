import axios from "axios";


export async function getBipUsdPrice() {
    try {
        const response = await axios.get("https://minter.1001btc.com/ru/getcfg");
        return response.data["usdt2bip"];
    } catch (e) {

    }

    return 0;
}

export async function getCurrencyRates() {
    const appId = process.env.CURRENCY_API_KEY;
    try {
        const response = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${appId}&base=USD`);

        if (response.data && response.data.rates) {
            return response.data;
        }

    } catch (e) {

    }

    return null;
}
