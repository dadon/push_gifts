import { Body, Controller, Get, Post, Put, Query, Route, Request, Tags } from "tsoa";

import * as db from "../db/campaign";
import { Campaign, CampaignCreateData, CampaignEditableData, PublicCampaign, SimpleResponse, Wallet } from "../types";
import { ApiError } from "../utils/cutom_error";
import { getUserLocaleRequest } from "../utils";


@Tags("Campaign")
@Route("campaign")
export class CampaignController extends Controller {


    /** Creates new Campaign. <br><br>
     *
     * Campaign is a Minter wallet and settings that can be shared with users via usual web links in form of Push Wallet.<br>
     * When user open this link in any browser, he can claim coins and spend them on phone refills, game accounts top-up and gift cards.<br><br>
     * There are two types of campaigns:
     * 1. **single** - for sending to one user. In this type of campaigns push wallet has unique link and immediately accessible for user to spend without authorization.
     * 2. **mass** - for sending to unknown set of users. It has universal link that leads to locked push wallet, where user can claim a gift by authorizing via his phone number.
     *
     * */
    @Post("")
    public async create(@Body() data: CampaignCreateData): Promise<Campaign> {
        console.log("create");
        return db.createCampaign(data);
    }

    /** Return information about Campaign */
    @Get("{id}")
    public async get(
        /** Campaign ID */
        id: string): Promise<Campaign> {
        const campaign = await db.getCampaign(id);

        if (!campaign) {
            throw new ApiError(`Could not find a resource by id ${id}`);
        }

        return campaign;
    }

    /** Update Campaign information<br>
     * Campaign can be updated anytime after creation
     * */
    @Put("{id}")
    public async update(
        /** Campaign ID */
        id: string, @Body() data: CampaignEditableData): Promise<SimpleResponse> {
        const campaign = await db.getCampaign(id);

        if (!campaign) {
            throw new ApiError(`Could not find a resource by id ${id}`);
        }

        await db.updateCampaign(id, data);

        return {
            success: true,
        };
    }

    @Get("{id}/wallets")
    public async getWallets(
        /** Campaign ID */
        id: string): Promise<Wallet[]> {
        return db.getCampaignWallets(id);
    }
}

@Tags("Campaign")
@Route("campaigns")
export class CampaignsController extends Controller {

    /** Return information about Campaign */
    @Get("{uid}")
    public async listByUid(
        /** User ID */
        uid: string): Promise<Campaign[]> {
        const campaigns = await db.getCampaignsByUID(uid);

        if (campaigns && campaigns.length) {
            await db.calculateStat(campaigns);
        }

        return campaigns;
    }
}

@Tags("Campaign")
@Route("campaign-public")
export class PublicCampaignController extends Controller {

    /** Return information about Campaign */
    @Get("{id}")
    public async getPublic(
        /** Campaign ID */
        id: string,
        /** User ID */
        @Query() uid: string, @Request() req: any): Promise<PublicCampaign> {

        const userLocale = getUserLocaleRequest(req);
        const campaign = await db.getCampaignPublicById(id, userLocale);

        if (uid) db.addCampaignVisitor(id, uid);

        if (!campaign) {
            throw new ApiError(`Could not find a resource by id ${id}`);
        }

        return campaign;
    }
}
