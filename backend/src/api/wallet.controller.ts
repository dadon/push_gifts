import { Body, Controller, Get, Post, Route, Request, Tags, Hidden } from "tsoa";
import { Request as ExpressRequest } from "express";

import * as db from "../db/wallet";

import {
    PublicWallet, PublicWalletSpendData,
    SimpleResponse,
    WalletCreateData,
} from "../types";
import { getUserLocaleRequest } from "../utils";


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

    /** Return public information about wallet  */
    @Get("{id}")
    public async get(
        /** Wallet ID  */
        id: string): Promise<PublicWallet> {
        return db.getPublicWallet(id);
    }

    /** Create spend record  */
    @Post("{id}/spend")
    public async spend(
        /** Wallet ID */
        id: string, @Body() data: PublicWalletSpendData): Promise<SimpleResponse> {

        const success = await db.spend(id, data);

        return {
            success: success,
        };
    }
}
