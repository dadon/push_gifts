import { generateMutations } from "./utils";
import * as api from "../api";
import router from "@/router";


export const Types = {
    currentCampaign: "currentCampaign",
    currentCampaignUsers: "currentCampaignUsers",
    refillMode: "refillMode",

    createCampaign: "createCampaign",
    loadCampaign: "loadCampaign",
    saveCampaign: "saveCampaign",
    showRefill: "showRefill",
};

export const Props = {
    [Types.currentCampaign]: null,
    [Types.currentCampaignUsers]: null,
    [Types.refillMode]: false,
};

export const Mutations = {
    ...generateMutations([
        Types.currentCampaign,
        Types.currentCampaignUsers,
        Types.refillMode,
    ]),
};

export const Actions = {
    async [Types.createCampaign](context: any) {
        const response = await api.post("campaign/create", {});
        if (response.success) {
            context.commit(Types.currentCampaign, response.campaign);

            router.push("/campaign/" + response.campaign.campaignId);
        }
    },

    async [Types.loadCampaign](context: any, campaignId: string) {
        const response = await api.get(`campaign/${campaignId}`);
        if (response.success) {
            context.commit(Types.currentCampaign, response.campaign);
            context.commit(Types.currentCampaignUsers, response.users);
            console.log("loaded", response.campaign);
        }
    },

    async [Types.saveCampaign](context: any, options: any) {
        console.log("Types.saveCampaign", Types.saveCampaign);
        const response = await api.post(`campaign/${options.campaignId}`, options.data);
        await context.dispatch(Types.loadCampaign, options.campaignId);
    },

    [Types.showRefill](context: any, value: boolean) {
        context.commit(Types.refillMode, value);
    },
};
