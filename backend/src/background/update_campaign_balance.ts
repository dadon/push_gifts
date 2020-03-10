import { BlockHandler, Campaign } from "../types";
import {  getAllCampaigns, saveCampaign } from "../db/campaign";
import * as minter from "../external_api/minter";
import { setCoinPrice } from "../db/background";
import { getAllWallets } from "../db/minter_wallet";
import { updateBalances } from "../db/balance";

class UpdateCampaignBalance implements BlockHandler {
    addresses: string[];
    changedWallets: string[];
    campaigns: Campaign[];

    async init() {
        this.campaigns = await getAllCampaigns();
        this.addresses = await getAllWallets();
        this.changedWallets = [];
    }

    async dispose() {
        await this.updateCampaignCoinsPrice();

        if (this.changedWallets.length) {
            await updateBalances(this.changedWallets, this.campaigns);
        }
    }

    async onBlock(block) {
        for (let tx of block.transactions) {

            const txStr = JSON.stringify(tx);
            for (let address of this.addresses) {
                if (txStr.indexOf(address) !== -1 && this.changedWallets.indexOf(address) === -1) {
                    this.changedWallets.push(address);
                }
            }

            if (tx.type !== 1) continue;

            const to = tx.data.to;
            if (this.addresses.indexOf(to) === -1) {
                continue;
            }

            const campaign = this.campaigns.find(el => el.address === to);
            if (campaign && !campaign.coin) {
                campaign.coin = tx.data.coin;
                await saveCampaign(campaign);
            }
        }
    }

    async updateCampaignCoinsPrice() {
        let coins = this.campaigns.map(el => el.coin).filter(el => el !== undefined);
        coins = [...new Set(coins)];

        for (let coin of coins) {
            if (coin === process.env.CHAIN_COIN) continue;

            const result = await minter.sdk.estimateCoinBuy({
                coinToBuy: process.env.CHAIN_COIN,
                valueToBuy: 1,
                coinToSell: coin,
            });

            if (result && result["will_pay"]) {
                await setCoinPrice(coin, result["will_pay"]);
            }
        }
    }
}

export default new UpdateCampaignBalance();
