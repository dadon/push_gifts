import { BlockHandler, Campaign } from "../types";
import { addRefillTx, getAllCampaigns } from "../db/campaign";
import * as minter from "../external_api/minter";
import { setCoinPrice } from "../db/background";

class UpdateCampaignBalance implements BlockHandler {
    addresses: string[];
    campaigns: Campaign[];

    async init() {
        this.campaigns = await getAllCampaigns();
        this.addresses = this.campaigns.map(el => el.address);
        // console.log("addresses", this.addresses);
    }

    async onBlock(block) {
        for (let tx of block.transactions) {
            if (tx.type !== 1) continue;

            const to = tx.data.to;
            if (this.addresses.indexOf(to) === -1) {
                continue;
            }

            // TODO: validate tx
            const campaign = this.getCampaign(to);

            await addRefillTx(campaign, tx.hash, minter.parseAmount(tx.data.value), tx.data.coin, tx.from);
        }

        await this.updateCampaignCoinsPrice();
    }

    getCampaign(address: string): Campaign {
        for (let campaign of this.campaigns) {
            if (campaign.address === address) return campaign;
        }
        return null;
    }

    async updateCampaignCoinsPrice() {
        let coins = this.campaigns.map(el => el.coin).filter(el => el !== undefined);
        coins = [...new Set(coins)];

        console.log("coins", coins);

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
