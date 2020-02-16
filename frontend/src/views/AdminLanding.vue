<template>
    <admin-layout>
        <div class="admin-landing">

<!--            <img class="landing" src="../assets/landing_top.png"/>-->
            <img class="landing" src="../assets/landing_top_light.png"/>

        </div>

        <div class="row admin-landing">
            <div class="admin-block">
                <h1>Create push wallet</h1>

                <ButtonAsync label="For a friend" :handler="createCampaignSingle" style-name="create-campaign-btn"/>
                <ButtonAsync label="For mass sharing" :handler="createCampaignMass" style-name="create-campaign-btn"/>
            </div>
        </div>

        <div class="row admin-landing admin-landing-block" v-if="campaignsSingle && campaignsSingle.length">
            <div class="admin-block">
                <h2>My push wallets</h2>

                <button class="button push-wallet-link" v-for="el in campaignsSingle" @click="openCampaign(el)">{{ pushWalletLabel(el) }}
                </button>
            </div>
        </div>

        <div class="row admin-landing admin-landing-block" v-if="campaignsMass && campaignsMass.length">
            <div class="admin-block">
                <h2>My mass sharings</h2>

                <div class="sharings-stat-head">
                    <div class="table">
                        <div class="tr">
                            <div class="td-big"></div>
                            <div class="td">Gifts<br>left</div>
                            <div class="td">People<br>scanned</div>
                            <div class="td">Conversion<br>rate</div>
                        </div>
                    </div>
                </div>

                <button class="button push-wallet-link" v-for="el in campaignsMass" @click="openCampaign(el)">
                    <div class="table">
                        <div class="tr">
                            <div class="td-big">{{ name(el) }}</div>
                            <div class="td">{{ giftsLeft(el) }}</div>
                            <div class="td">{{ el.stat.visitorNum }}</div>
                            <div class="td">{{ conversion(el) }}%</div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </admin-layout>
</template>

<script>
    import { Types } from "@/store/admin";
    import ButtonAsync from "@/components/ButtonAsync";
    import AdminLayout from "@/layouts/AdminLayout";
    import router from "@/router";

    export default {
        components: {
            AdminLayout,
            ButtonAsync,
        },

        computed: {
            campaigns() {
                return this.$store.state[Types.campaigns];
            },

            campaignsSingle() {
                if (this.campaigns && this.campaigns.length) {
                    return this.campaigns.filter(el => el.type === "single").sort((a, b) => b.balance - a.balance);
                }

                return null;
            },

            campaignsMass() {
                if (this.campaigns && this.campaigns.length) {
                    return this.campaigns.filter(el => el.type === "mass").sort((a, b) => b.balance - a.balance);
                }

                return null;
            },
        },

        methods: {
            async createCampaignSingle() {
                return this.createCampaign("single");
            },

            async createCampaignMass() {
                return this.createCampaign("mass");
            },

            async createCampaign(type) {
                return this.$store.dispatch(Types.createCampaign, type);
            },

            async openCampaign(campaign) {
                router.push(`/create/${campaign.type}/${campaign.campaignId}`);
            },

            name(campaign) {
                if (campaign.name) return campaign.name;
                return campaign.campaignId;
            },

            giftsLeft(campaign) {
                if (campaign && campaign.rewardPerUser && campaign.balance) {
                    return Math.floor(campaign.balance / campaign.rewardPerUser);
                }

                return 0;
            },

            conversion(campaign) {
                if (campaign && campaign.stat && campaign.stat.visitorNum) {
                    return Math.round(campaign.stat.usersNum / campaign.stat.visitorNum * 100);
                }

                return 0;
            },

            pushWalletLabel(campaign) {
                let result = [];
                if (campaign.name) {
                    result.push("to " + campaign.name);
                }
                if (campaign.balance) {
                    result.push(`${campaign.balance.toFixed(2)} ${campaign.coin}`);
                }

                if (!result.length) {
                    result.push(campaign.campaignId);
                }

                return result.join(" - ");
            }
        },

        mounted() {
            this.$store.dispatch(Types.loadCampaigns);
        },
    };
</script>
