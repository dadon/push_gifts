import axios from "axios";
import Big from "big.js";
import { Minter, SendTxParams, MultisendTxParams, DelegateTxParams, BuyTxParams, SellTxParams } from "minter-js-sdk";
import { ServiceError } from "../utils/cutom_error";


export const sdk = new Minter({
    apiType: "node",
    baseURL: process.env.MINTER_NODE,
});

export const POW = Big(10).pow(18);

async function get(endpoint: string): Promise<object> {
    const url = `${process.env.MINTER_NODE}/${endpoint}`;

    // console.log("endpoint", endpoint);

    try {
        const apiResponse = await axios.get(url, {
            timeout: 5000,
        });

        return apiResponse.data.result;
    } catch (e) {
        console.error("fail", url);

        if (e.response && e.response.data) {
            console.error(e.response.data);
        } else {
            console.error(e);
        }

        return null;
    }
}

export async function getStatus(): Promise<any> {
    return await get("status");
}

export async function getCurrentBlock(): Promise<number> {
    const status = await getStatus();

    if (!status || !status["latest_block_height"]) {
        throw new ServiceError("getCurrentBlock error", {
            status: status,
            currentBlock: status["latest_block_height"],
            time: Date.now(),
        });
    }

    return parseInt(status["latest_block_height"]);
}

export async function getBlock(num: number): Promise<any> {
    return await get(`block?height=${num}`);
}

export async function getAddress(address: string): Promise<any> {
    return await get(`address?address=${address}`);
}

export async function getTransaction(hash: string): Promise<any> {
    return await get(`transaction?hash=${hash}`);
}

export function isTransactionValid(tx: any) {
    return !(!tx || (tx.code !== undefined && tx.code > 0) || tx.log);
}

export async function getTransactionsTo(address: string, coin: string = null): Promise<any> {
    const addressNum = address.split("Mx")[1];
    let query = `"tx.to='${addressNum}'"`;
    if (coin) {
        coin = coin.toUpperCase();
        query = `"tags.tx.to='${addressNum}' AND tags.tx.coin='${coin}'"`;
    }
    return await get(`transactions?query=${encodeURI(query)}`);
}

export async function getCoinTransaction(coin: string): Promise<any> {
    let query = `"tx.coin='${coin}'"`;
    return await get(`transactions?query=${encodeURI(query)}`);
}

export async function getUserBalanceCustom(address: string, coinSymbol: string): Promise<number> {
    const addressData = await getAddress(address);

    if (!addressData) {
        console.error("getUserBalanceCustom error", address);
        return -1;
    }

    coinSymbol = coinSymbol.toUpperCase();

    let amount = addressData.balance[coinSymbol];
    if (!amount) amount = 0;

    amount = Big(amount)
        .div(POW)
        .toFixed(4);
    amount = parseFloat(amount);

    return amount;
}

export async function getUserBalanceRaw(address: string, coinSymbol: string): Promise<string> {
    const addressData = await getAddress(address);

    if (!addressData) {
        console.error("getUserBalanceCustom error", address);
        return null;
    }

    coinSymbol = coinSymbol.toUpperCase();

    let amount = addressData.balance[coinSymbol];
    if (!amount) amount = 0;

    amount = Big(amount)
        .div(POW)
        .toString();

    return amount;
}

export async function getCoinInfo(symbol: string): Promise<any> {
    symbol = symbol.toUpperCase();
    return await get(`coin_info?symbol=${symbol}`);
}

export interface CoinToSend {
    to: string;
    amount: number;
    coin?: string;
}

export async function sendCoins(privateKey: string, coinToSend: CoinToSend, feeCoin?: string, payload?: string) {
    const options = {
        chainId: process.env.CHAIN_ID,
        privateKey: privateKey,
        address: coinToSend.to,
        amount: coinToSend.amount.toString(),
        coinSymbol: coinToSend.coin || process.env.MAIN_COIN_SYMBOL,
        feeCoinSymbol: feeCoin || coinToSend.coin,
    };

    if (payload) {
        options["message"] = payload;
    }

    console.log("options", options);

    const txParams = new SendTxParams(options);

    try {
        const txHash = await sdk.postTx(txParams);
        return txHash;
    } catch (e) {
        if (e.response) {
            console.error(e.response.data);
        } else {
            console.error(e);
        }
    }

    return null;
}

export function multiSendCoins(privateKey: string, coinsToSend: CoinToSend[], feeCoin?: string) {

    const list = coinsToSend.map(el => {
        return {
            to: el.to,
            value: el.amount.toString(),
            coin: el.coin || process.env.MAIN_COIN_SYMBOL,
        };
    });

    const txParams = new MultisendTxParams({
        chainId: process.env.CHAIN_ID,
        privateKey: privateKey,
        list: list,
        feeCoinSymbol: feeCoin || process.env.MAIN_COIN_SYMBOL,
    });

    return sdk.postTx(txParams);
}


export function delegateCoins(privateKey: string, coinToSend: CoinToSend, feeCoin?: string) {

    const txParams = new DelegateTxParams({
        chainId: process.env.CHAIN_ID,
        privateKey: privateKey,
        publicKey: coinToSend.to,
        coinSymbol: coinToSend.coin || process.env.MAIN_COIN_SYMBOL,
        stake: coinToSend.amount,
        feeCoinSymbol: feeCoin || coinToSend.coin,
        message: '',

    });

    return sdk.postTx(txParams);
}


export interface CoinToBuy {
    coinFrom: string;
    coinTo: string;
    amount: number;
}

export function buyCoins(privateKey: string, coinToBuy: CoinToBuy, feeCoin?: string) {
    const txParams = new BuyTxParams({
        privateKey: privateKey,
        chainId: process.env.CHAIN_ID,
        coinFrom: coinToBuy.coinFrom,
        coinTo: coinToBuy.coinTo,
        buyAmount: coinToBuy.amount,
        feeCoinSymbol: feeCoin,
        message: '',
    });

    return sdk.postTx(txParams);
}


export interface CoinToSell {
    coinFrom: string;
    coinTo: string;
    amount: number;
}

export function sellCoins(privateKey: string, coinToSell: CoinToSell, feeCoin?: string) {

    const txParams = new SellTxParams({
        privateKey: privateKey,
        chainId: process.env.CHAIN_ID,
        coinFrom: coinToSell.coinFrom,
        coinTo: coinToSell.coinTo,
        sellAmount: coinToSell.amount,
        feeCoinSymbol: feeCoin || process.env.CHAIN_COIN,
        message: '',
    });

    return sdk.postTx(txParams);
}


async function getSellCoinBipPrice(sellAmount: number, coin: string) {
    const coinInfo = await getCoinInfo(coin);
}




export async function GetCurrentBIPPriceFromBipDev(){

    const apiResponse = await axios.get("https://api.bip.dev/api/price", {
        timeout: 5000,
    });

    console.log(apiResponse.data.data.price);

    return apiResponse.data.data.price;

}


//
export async function getStakes(validatorPublicKey:String){

    const apiResponse = await axios.get("https://api.minter.stakeholder.space/candidate?pub_key="+validatorPublicKey, {
        timeout: 5000,
    });

    //console.log(apiResponse.data.result.stakes);

    return apiResponse.data.result.stakes;

}



// Return = supply * ((1 + deposit / reserve) ^ (crr) - 1)
export function buyCoin(supply, deposit, reserve, crr) {

    return supply * (Math.pow((1 + deposit / reserve), (crr)) - 1);

}

// Return = reserve * (1 - (1 - sellAmount / supply) ^ (1 / crr))
export function sellCoin(supply, sellAmount, reserve, crr) {

    return reserve * (1 - Math.pow( (1 - sellAmount / supply), (1 / crr)));

}

export function parseAmount(value: string) {
    return parseFloat(Big(value)
        .div(POW)
        .toString());
}
