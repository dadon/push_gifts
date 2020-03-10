import * as minter from "../external_api/minter";
import { getAllWallets, getWallet, saveWallet } from "./minter_wallet";
import { Campaign } from "../types";
import { getAllCampaigns, saveCampaign } from "./campaign";


export async function updateBalances(addresses: string[], campaigns?: Campaign[]) {
    // console.log("updateBalances addresses", addresses);
    // console.log("updateBalances campaigns", campaigns);
    for (let address of addresses) {
        const addressData = await minter.getAddress(address);
        if (!addressData) continue;

        const wallet = await getWallet(address);
        wallet.balance = addressData.balance;
        await saveWallet(wallet);

        if (campaigns) {
            const campaign = campaigns.find(el => el.address === address);
            if (campaign && campaign.coin) {
                campaign.balance = minter.parseAmount(wallet.balance[campaign.coin] || "0");
                await saveCampaign(campaign);
            }
        }
    }
}

export async function updateAllBalances() {
    const addresses = await getAllWallets();
    const campaigns = await getAllCampaigns();
    await updateBalances(addresses, campaigns);
}
