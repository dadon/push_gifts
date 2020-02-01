import { Request, Response } from "express";
import { createCampaign, getCampaign, getCampaignPublic, updateCampaign } from "../db/campaign";
import { getCampaignUsers } from "../db/user";
import { getUserLocaleRequest } from "../utils";


export async function create(req: Request, res: Response) {
    const newCampaign = await createCampaign();

    res.json({
        success: true,
        campaign: newCampaign,
    });
}

export async function get(req: Request, res: Response) {
    const { campaignId } = req.params;

    const campaign = await getCampaign(campaignId);
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
    const { campaignPublicId } = req.params;

    const userLocale = getUserLocaleRequest(req);

    const campaign = await getCampaignPublic(campaignPublicId, userLocale);

    res.json({
        success: true,
        campaign,
        userLocale,
    });
}

export async function update(req: Request, res: Response) {
    const { campaignId } = req.params;
    const data = req.body;

    await updateCampaign(campaignId, data);

    res.json({
        success: false,
    });
}
