import { Request, Response } from "express";

import * as db from "../db/user";
import { getUserLocaleRequest } from "../utils";
import { registerKeyWord, validatePhone } from "../external_api/biptophone";


export async function create(req: Request, res: Response) {
    const { campaignPublicId, userInfo, navigator, uid } = req.body;

    console.log("create", campaignPublicId, userInfo);

    // TODO: validate input

    userInfo["userLocale"] = getUserLocaleRequest(req);
    userInfo["navigator"] = navigator;
    userInfo["uid"] = uid;

    await db.createUser(campaignPublicId, userInfo);

    res.json({
        success: true,
    });
}

export async function get(req: Request, res: Response) {
    const { userId } = req.params;

    const user = await db.getUserPublicFields(userId);

    res.json({
        success: true,
        user,
    });
}

export async function spend(req: Request, res: Response) {
    const { userId } = req.params;
    const { type, toAddress, amount, payload } = req.body;

    const success = await db.spend(userId, type, toAddress, amount, payload);

    const user = await db.getUserPublicFields(userId);

    res.json({
        success,
        user,
    });
}

export async function checkPhone(req: Request, res: Response) {
    let { phone } = req.body;

    if (!phone || phone.length < 5) {
        res.json({
            success: false,
            error: "local validation fail",
        });
        return;
    }

    phone = "+" + phone.replace(/\D/g, "");

    const isValid = await validatePhone(phone);
    if (!isValid) {
        res.json({
            success: false,
            error: "provider validation fail",
        });
        return;
    }

    const response = await registerKeyWord(phone);
    if (response && response.keyword) {
        res.json({
            success: true,
            keyword: response.keyword,
            minbip: response.minbip,
        });
    }
}
