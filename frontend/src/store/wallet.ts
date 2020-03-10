import { generateMutations } from "./utils";
import * as api from "../api";
import { generateId } from "@/utils";


export const SpendTypes = [
    {
        "id": "timeloop",
        "address": "Mx3650064486380210127159872871912061022891",
        "title": "spend_title_timeloop",
        "action": "spend_action_timeloop",
    },
    {
        "id": "bip2phone",
        "address": "Mx403b763ab039134459448ca7875c548cd5e80f77",
        "title": "spend_title_phone",
        needPhone: true,
        "action": "spend_action_phone",
    },
    { "id": "send", title: "spend_title_transfer", needAddress: true, action: "spend_action_transfer" },
    {
        "id": "timeloop",
        "address": "Mx3650064486380210127159872871912061022891",
        "title": "spend_title_timeloop",
        "action": "spend_action_timeloop",
    },
    {
        "id": "bip2phone",
        "address": "Mx403b763ab039134459448ca7875c548cd5e80f77",
        "title": "spend_title_phone",
        needPhone: true,
        "action": "spend_action_phone",
    },
    { "id": "send", title: "spend_title_transfer", needAddress: true, action: "spend_action_transfer" },
];

export const Types = {
    currentUser: "currentUser",
    currentUserCampaign: "currentUserCampaign",
    walletPassword: "walletPassword",
    spendTypes: "spendTypes",

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
    [Types.spendTypes]: null,
};

export const Mutations = {
    ...generateMutations([
        Types.currentUser,
        Types.currentUserCampaign,
        Types.walletPassword,
        Types.spendTypes,
    ]),
};

export const Actions = {
    async createUser(context: any, data: object) {
        const response = await api.post("wallet", data);
        return response.success;
    },

    async loadUser(context: any, userId: string) {
        const user = await api.get(`wallet/${userId}`);
        if (user) {
            context.commit(Types.currentUser, user);

            if (user.campaign) {
                context.commit(Types.currentUserCampaign, user.campaign);
            }
        }

        return user;
    },

    async loadSpendTypes(context: any) {
        const result = await api.get(`wallet/spend-types`);
        if (result) {
            const resultClean = [];
            const groups: any = {};
            for (let el of result) {
                if (el.group) {
                    let group: any = groups[el.group];
                    if (!group) {
                        group = JSON.parse(JSON.stringify(el));
                        group.type = el.group;
                        group.items = [];
                        groups[el.group] = group;
                        resultClean.push(group);
                    }
                    group.items.push(el);
                } else {
                    resultClean.push(el);
                }
            }
            context.commit(Types.spendTypes, resultClean);
            console.log("spendTypes", result);
        }
    },

    async loadPublicCampaign(context: any, campaignPublicId: string) {
        const campaign = await api.get(`campaign-public/${campaignPublicId}`);
        if (campaign) {
            context.commit(Types.currentUserCampaign, campaign);
        }
    },

    async spend(context: any, options: any) {
        const userId = context.state[Types.currentUser].walletId;
        const response = await api.post(`wallet/${userId}/spend`, options);

        if (response.success) {
            await context.dispatch(Types.loadUser, userId);
        }

        return response.success;
    },

    async spendWithPayload(context: any, options: any) {
        const userId = context.state[Types.currentUser].walletId;
        const response = await api.post(`wallet/${userId}/spend`, options);

        if (response.success) {
            await context.dispatch(Types.loadUser, userId);
        }

        return response;
    },

    checkPhone(context: any, phone: String) {
        return api.post(`misc/register-phone`, phone);
    },
};
