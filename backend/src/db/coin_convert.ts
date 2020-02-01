import rdb from "./rdb";
import { CoinConvertRecord } from "../types";
import { sendCoins } from "../external_api/minter";
import { getWalletKey } from "./wallet";


export async function getConvertRecords(): Promise<CoinConvertRecord[]> {
    const list = await rdb.getList(rdb.buildKey("convertRecords"));
    if (list) {
        return list.map(el => JSON.parse(el));
    }

    return [];
}

export async function addRecord(rec: CoinConvertRecord) {
    await rdb.rpush(rdb.buildKey("convertRecords"), JSON.stringify(rec));
}

export async function removeRecord(rec: CoinConvertRecord) {
    await rdb.lrem(rdb.buildKey("convertRecords"), 0, JSON.stringify(rec));
}

export async function send(rec: CoinConvertRecord) {
    const walletKey = await getWalletKey(rec.addressFrom);

    const txHash = await sendCoins(walletKey, {
        to: rec.addressTo,
        amount: rec.amount,
        coin: rec.coinTo,
    }, rec.coinFrom, rec.payload);

    if (txHash) {
        await removeRecord(rec);
    }
}
