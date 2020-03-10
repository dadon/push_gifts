import rdb from "./rdb";
import { GiftCard } from "../types";
import id_generator from "../utils/id_generator";


export function add(giftCard: GiftCard) {
    giftCard.id = id_generator(10);
    giftCard.createTime = Date.now();
    return save(giftCard);
}

export function save(giftCard: GiftCard) {
    return rdb.setData(rdb.buildKey("gift_card", giftCard.id), giftCard);
}

export async function getAll(): Promise<GiftCard[]> {
    const keys = await rdb.keys(rdb.buildKey("gift_card:*"));
    if (!keys || !keys.length) return [];

    const result = [];
    for (let key of keys) {
        const el: GiftCard = await rdb.getData(key);
        if (el.userId) continue;
        result.push(el);
    }
    return result;
}
