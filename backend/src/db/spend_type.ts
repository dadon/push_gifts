import { SpendType } from "../types";
import { getAll } from "./gift_card";

const GIFT_CARDS_ADDRESS = "Mxc90c5d314fcae6d5aad494a03856bc0fd85b4450";

export async function getTypes() {
    const result: SpendType[] = [];

    result.push({
        type: "send",
        needAddress: true
    });

    result.push({
        type: "bip2phone",
        address: "Mx403b763ab039134459448ca7875c548cd5e80f77",
        needPhone: true
    });

    result.push({
        type: "timeloop",
        address: "Mx3650064486380210127159872871912061022891",
    });

    const giftCards = await getAll();
    if (giftCards && giftCards.length) {
        const spendTypes = {};

        for (let giftCard of giftCards) {
            spendTypes[giftCard.spendType] = giftCard;
        }

        for (let key in spendTypes) {
            const giftCard = spendTypes[key];

            result.push({
                type: giftCard.spendType,
                giftCard: true,
                priceUsd: giftCard.priceUsd,
                hasLink: giftCard.link !== undefined,
                address: GIFT_CARDS_ADDRESS,
                group: giftCard.group,
            });
        }
    }

    const spendTypesMap = {};
    result.forEach(el => spendTypesMap[el.type] = el);

    const giftCardsMap = {};
    if (giftCards) giftCards.forEach(el => giftCardsMap[el.spendType] = el);

    return {
        spendTypesMap,
        giftCardsMap,
    };
}
