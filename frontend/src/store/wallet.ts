import { generateMutations } from "./utils";
import * as api from "../api";
import { generateId } from "@/utils";


export const SpendTypes = [
    { "id": "timeloop", "address": "Mx3650064486380210127159872871912061022891", "title": "Do you want to top up Time Loop game account on <span>{amount}</span> {coin}?", "action": "Send"},
    { "id": "bip2phone", "address": "Mx403b763ab039134459448ca7875c548cd5e80f77", "title": "Do you want to refill your phone on <span>{amount}</span> {coin}?", needPhone: true, "action": "Refill"},
    { "id": "Frame-2" },
    { "id": "Frame-3" },
    { "id": "Frame-4" },
];

export const Types = {
    currentUser: "currentUser",
    currentUserCampaign: "currentUserCampaign",
    walletPassword: "walletPassword",

    createUser: "createUser",
    loadUser: "loadUser",
    loadPublicCampaign: "loadPublicCampaign",
    spend: "spend",
    showSpend: "showSpend",
    checkPhone: "checkPhone",
};

export const Props = {
    [Types.currentUser]: null,
    [Types.currentUserCampaign]: null,
    [Types.walletPassword]: null,
};

export const Mutations = {
    ...generateMutations([
        Types.currentUser,
        Types.currentUserCampaign,
        Types.walletPassword,
    ]),
};

export const Actions = {
    async [Types.createUser](context: any, data: object) {
        const response = await api.post("wallet", data);
        return response.success;
    },

    async [Types.loadUser](context: any, userId: string) {
        const user = await api.get(`wallet/${userId}`);
        if (user) {
            context.commit(Types.currentUser, user);

            if (user.campaign) {
                context.commit(Types.currentUserCampaign, user.campaign);
            }
        }

        return user;
    },

    async [Types.loadPublicCampaign](context: any, campaignPublicId: string) {
        const campaign = await api.get(`campaign-public/${campaignPublicId}`);
        if (campaign) {
            context.commit(Types.currentUserCampaign, campaign);
        }
    },

    async [Types.spend](context: any, options: any) {
        const userId = context.state[Types.currentUser].walletId;
        const response = await api.post(`wallet/${userId}/spend`, options);

        if (response.success) {
            await context.dispatch(Types.loadUser, userId);
        }

        return response.success;
    },

    async [Types.checkPhone](context: any, phone: String) {
        const response = await api.post(`misc/register-phone`, phone);
        return response;
    },
};
