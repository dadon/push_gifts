import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Wallets.vue";
import AdminLanding from "../views/AdminLanding.vue";
import CreateMassWallet from "../views/CreateMassWallet.vue";
import CreateSingleWallet from "../views/CreateSingleWallet.vue";
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
        path: "/create/mass/:campaignId",
        component: CreateMassWallet,
    },

    {
        path: "/create/single/:campaignId",
        component: CreateSingleWallet,
    },

    {
        path: "/c-:campaignPublicId",
        component: CampaignSignUp,
    },

    {
        path: "/w-:userId",
        component: UserWallet,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
