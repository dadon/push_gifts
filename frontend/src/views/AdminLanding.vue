<template>
    <admin-layout>
        <div class="admin-landing">

<!--            <img class="landing" src="../assets/landing_top.png"/>-->
<!--            <img class="landing" src="../assets/landing_top_light.png"/>-->
            <div class="pyramid">
                <svg xmlns="http://www.w3.org/2000/svg" width="2000" height="796"><path d="M 496 238 L 1978 238 L 1978 762 L 1039 762 L 1049 742.5 L 1954.5 742.5 L 1944.5 722.5 L 1059 722.5 L 1074 703 L 1929.5 703 L 1913.5 683.5 L 1089 683.5 L 1104 664 L 1898.5 664 L 1883.5 644 L 1119 644 L 1134 624 L 1868.5 624 L 1853.5 604.5 L 1149 604.5 L 1164 584.5 L 1838.5 584.5 L 1823.5 565.5 L 1179 564.5 L 1194 545 L 1808.5 546 L 1793.5 526 L 1209 525 L 1224 505.5 L 1777.5 506.5 L 1762.5 486.5 L 1239 486 L 1254 466.5 L 1747.5 466.5 L 1732.5 447 L 1269 447 L 1284 427.5 L 1717.5 427 L 1702.5 407.5 L 1299 407.5 L 1314 388 L 1687.5 388 L 1672.5 369 L 1330 368.5 L 1345 349.5 L 1657.5 349.5 L 1642.5 330 L 1360 329.5 L 1375 310 L 1627.5 310 L 1612.5 290.5 L 1390 290.5 L 1405 270.5 L 1597.5 270.5 L 1582.5 250.5 L 1420 250.5 L 1435 233 L 1567.5 233 L 1551.5 213 L 1450 213 L 1465 193.5 L 1536.5 193.5 L 1522 176.5 L 1477 176.5 L 1510.5 176.5" fill="transparent" stroke-width="18" stroke="rgb(255, 255, 255)" stroke-linecap="square" stroke-linejoin="round"></path><path d="M 1477 168.5 C 1477 168.5 1476.875 161.896 1481.5 157.934 C 1486.125 153.972 1482.624 156.3 1494.5 152.123 C 1506.376 147.945 1504.5 140.5 1504.5 140.5 C 1504.5 140.5 1508.75 147.236 1509.5 152.123 C 1510.25 157.009 1508 160.575 1508 160.575 C 1508 160.575 1512 161.236 1515 163.217 C 1518 165.198 1520 168.5 1520 168.5 Z" fill="hsl(200, 100%, 100%)"></path></svg>
            </div>
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

<style>
    .pyramid {
        position: relative;
        width: 2000px;
        height: 769px;
        transform-origin: 0% 50%;
        transform: scale(0.4);
    }

    .pyramid-top {
        position: absolute;
        width: 43px;
        height: 28px;
        top: -30px;
        left: 970px;
    }
</style>
