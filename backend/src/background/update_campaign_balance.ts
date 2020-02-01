import { BlockHandler, Campaign } from "../types";
import { addRefillTx, getAllCampaigns } from "../db/campaign";
import * as minter from "../external_api/minter";

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
    }

    getCampaign(address: string): Campaign {
        for (let campaign of this.campaigns) {
            if (campaign.address === address) return campaign;
        }
        return null;
    }
}

export default new UpdateCampaignBalance();
