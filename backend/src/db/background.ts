import rdb from "./rdb";


let START_BLOCK = 0;

if (process.env.START_BLOCK) {
    START_BLOCK = parseInt(process.env.START_BLOCK);
}

export async function getLastBlock(): Promise<number> {
    const result = await rdb.get(rdb.buildKey("lastBlock"));

    if (result) {
        let num = parseInt(result);
        if (num > START_BLOCK) {
            return num;
        }
    }

    return START_BLOCK;
}

export async function setLastBlock(value: number) {
    await rdb.set(rdb.buildKey("lastBlock"), value.toString());
}

export async function getCurrencyRate(): Promise<object> {
    return await rdb.getData(rdb.buildKey("currencyRate"));
}

export async function setCurrencyRate(data: object) {
    await rdb.setData(rdb.buildKey("currencyRate"), data);
}

export async function getBipPrice(): Promise<number> {
    const result = await rdb.get(rdb.buildKey("bipPrice"));
    if (result) {
        return parseFloat(result);
    }

    return 0;
}

export async function setBipPrice(value: number) {
    await rdb.set(rdb.buildKey("bipPrice"), value.toString());
}

export async function getCoinPrice(coin: string): Promise<number> {
    const result = await rdb.get(rdb.buildKey("coinPrice", coin));

    if (result) {
        return parseFloat(result);
    }

    return -1;
}

export async function setCoinPrice(coin: string, price: number) {
    console.log("setCoinPrice", coin, price);
    await rdb.set(rdb.buildKey("coinPrice", coin), price.toString());
}
