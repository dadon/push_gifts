import { generateMutations } from "./utils";
import * as api from "../api";
import router from "@/router";
import { getUserId } from "@/utils/user_id";


export const Types = {
    currentCampaign: "currentCampaign",
    currentCampaignUsers: "currentCampaignUsers",
    refillMode: "refillMode",
    campaigns: "campaigns",

    createCampaign: "createCampaign",
    loadCampaign: "loadCampaign",
    saveCampaign: "saveCampaign",
    showRefill: "showRefill",
    loadCampaigns: "loadCampaigns",
    sendSms: "sendSms",
};

export const Props = {
    [Types.currentCampaign]: null,
    [Types.currentCampaignUsers]: null,
    [Types.refillMode]: false,
    [Types.campaigns]: null,
};

export const Mutations = {
    ...generateMutations([
        Types.currentCampaign,
        Types.currentCampaignUsers,
        Types.refillMode,
        Types.campaigns,
    ]),
};

export const Actions = {
    async [Types.createCampaign](context: any, type: string) {
        const campaign = await api.post("campaign", { type });

        context.commit(Types.currentCampaign, campaign);
        router.push(`/create/${type}/${campaign.campaignId}`);
    },

    async [Types.loadCampaign](context: any, campaignId: string) {
        const campaign = await api.get(`campaign/${campaignId}`);
        context.commit(Types.currentCampaign, campaign);
    },

    async [Types.saveCampaign](context: any, options: any) {
        console.log("Types.saveCampaign", Types.saveCampaign);
        await api.put(`campaign/${options.campaignId}`, options.data);
        await context.dispatch(Types.loadCampaign, options.campaignId);
    },

    async [Types.loadCampaigns](context: any) {
        const userId = getUserId();
        const campaigns = await api.get(`campaigns/${userId}`);

        if (campaigns && campaigns.length) {
            context.commit(Types.campaigns, campaigns);
        }
    },

    [Types.showRefill](context: any, value: boolean) {
        context.commit(Types.refillMode, value);
    },
};
