import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Wallets.vue";
import AdminLanding from "../views/AdminLanding.vue";
import CampaignAdmin from "../views/CampaignAdmin.vue";
import CampaignSignUp from "../views/CampaignSignUp.vue";
import UserWallet from "../views/UserWallet.vue";
import Wallets from "@/views/Wallets.vue";
import People from "@/views/People.vue";


Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: AdminLanding,
    },

    {
        path: "/wallets",
        component: Wallets,
    },

    {
        path: "/people",
        component: People,
    },

    {
        path: "/campaign/:campaignId",
        component: CampaignAdmin,
    },

    {
        path: "/c/:campaignPublicId",
        component: CampaignSignUp,
    },

    {
        path: "/c/:campaignPublicId/:userId",
        component: UserWallet,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
