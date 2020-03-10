import { Body, Controller, Get, Post, Route, Request, Tags, Hidden } from "tsoa";
import { Request as ExpressRequest } from "express";

import * as db from "../db/wallet";

import {
    PublicWallet, PublicWalletSpendData,
    SimpleResponse, SpendType,
    WalletCreateData,
} from "../types";
import { getUserLocaleRequest } from "../utils";
import { getTypes } from "../db/spend_type";


@Tags("Wallet")
@Route("wallet")
export class WalletController extends Controller {

    /** Create new wallet */
    @Hidden()
    @Post("")
    public async create(@Body() data: WalletCreateData, @Request() req: ExpressRequest): Promise<SimpleResponse> {
        // TODO: validate input

        data.localeInfo = getUserLocaleRequest(req);

        await db.createWallet(data);

        return {
            success: true,
        };
    }

    /** Return information about spend types  */
    @Get("spend-types")
    public async spendTypes(): Promise<SpendType[]> {
        const data = await getTypes();
        return Object.values(data.spendTypesMap);
    }

    /** Return public information about wallet  */
    @Get("{id}")
    public async get(
        /** Wallet ID  */
        id: string, @Request() req: any): Promise<PublicWallet> {

        const localeInfo = getUserLocaleRequest(req);

        return db.getPublicWallet(id, localeInfo);
    }

    /** Create spend record  */
    @Post("{id}/spend")
    public async spend(
        /** Wallet ID */
        id: string, @Body() data: PublicWalletSpendData): Promise<SimpleResponse> {

        let payload: any = null;

        try {
            payload = await db.spend(id, data);
        } catch (e) {

        }

        return {
            success: Boolean(payload),
            data: payload,
        };
    }

}
