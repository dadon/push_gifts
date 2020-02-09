import { Request, Response } from "express";

import * as db from "../db/campaign";
import { getCampaignUsers } from "../db/user";
import { getUserLocaleRequest } from "../utils";
import { Campaign } from "../types";
import { sendSms } from "../external_api/sms";


export async function create(req: Request, res: Response) {
    const { uid, type } = req.body;
    const newCampaign = await db.createCampaign(uid, type);

    res.json({
        success: true,
        campaign: newCampaign,
    });
}

export async function get(req: Request, res: Response) {
    const { campaignId } = req.params;

    const campaign = await db.getCampaign(campaignId);

    if (campaign) {
        const users = await getCampaignUsers(campaignId);

        res.json({
            success: true,
            campaign,
            users,
        });
    } else {
        res.json({
            success: false,
        });
    }
}

export async function getPublic(req: Request, res: Response) {
    const { uid } = req.query;
    const { campaignPublicId } = req.params;

    const userLocale = getUserLocaleRequest(req);

    const campaign = await db.getCampaignPublicById(campaignPublicId, userLocale);

    if (uid) db.addCampaignVisitor(campaignPublicId, uid);

    res.json({
        success: true,
        campaign,
        userLocale,
    });
}

export async function getListByUid(req: Request, res: Response) {
    const { uid } = req.query;

    let campaigns: Campaign[] = null;

    if (uid) {
        campaigns = await db.getCampaignsByUID(uid);

        if (campaigns) {
            await db.calculateStat(campaigns);
        }
    }

    res.json({
        success: true,
        campaigns,
    });
}

export async function update(req: Request, res: Response) {
    const { campaignId } = req.params;
    const data = req.body;

    await db.updateCampaign(campaignId, data);

    res.json({
        success: true,
    });
}

export async function sms(req: Request, res: Response) {
    const data = req.body;

    if (data.phone && data.message) {
        sendSms(data.phone, data.message);
    }

    res.json({
        success: true,
    });
}
