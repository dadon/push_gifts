<template>
    <admin-layout>
        <loader v-if="!campaign"/>

        <div class="row">
            <div class="col-sm-12 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4 campaign-admin" v-if="campaign">
                <section>
                    <back-button :handler="back"/>

                    <h2>Send any coins to this address</h2>

                    <sharing-buy-block :address="campaign.address"/>

                    <div class="row">
                        <div class="col-sm-12 inline">
                            <loader v-if="campaign.waitForRefill || campaign.balance === 0"/>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <transition name="fade">
            <section v-if="campaign && campaign.balance > 0">
                <share-desktop :gift-size="campaign.balance" :gift-coin="campaign.coin" :url="shareLink" :single="true"/>
            </section>
        </transition>

        <div class="row">
            <div class="col-sm-12 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4 campaign-admin" v-if="campaign">

                <section>
                    <h2>Optional settings</h2>

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="admin-input">
                                <input type="text" v-model="brandName" placeholder="Your name"/>
                            </div>
                            <div class="admin-input">
                                <input type="text" v-model="name" placeholder="Your friend's name"/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </admin-layout>
</template>

<script>
    import ButtonAsync from "@/components/ButtonAsync";
    import { Types } from "@/store/admin";
    import { sleep } from "@/utils";
    import CampaignInfo from "@/components/CampaignInfo";
    import CampaignUsers from "@/components/CampaignUsers";
    import Loader from "@/components/Loader";
    import CampaignTitle from "@/components/CampaignTitle";
    import CampaignAddBalance from "@/components/CampaignAddBalance";
    import AdminLayout from "@/layouts/AdminLayout";
    import BackButton from "@/components/BackButton";
    import Modal from "@/components/Modal";
    import router from "@/router";
    import SharingBuyBlock from "@/components/SharingBuyBlock";
    import ShareDesktop from "@/components/ShareDesktop";

    export default {
        components: {
            ShareDesktop,
            SharingBuyBlock,
            BackButton,
            AdminLayout,
            CampaignAddBalance,
            CampaignTitle,
            CampaignUsers,
            CampaignInfo,
            ButtonAsync,
            Loader,
            Modal,
        },

        data() {
            return {
                updateStateId: -1,
                saveTimer: -1,
                copiedMessage: false,

                giftNum: 100,
                rewardPerUser: 10,
                name: null,
                brandName: null,
                saving: false,
                showModal: false,
            };
        },

        computed: {
            campaign() {
                return this.$store.state[Types.currentCampaign];
            },

            giftsLeft() {
                if (this.campaign && this.campaign.rewardPerUser && this.campaign.balance) {
                    return Math.floor(this.campaign.balance / this.campaign.rewardPerUser);
                }

                return 0;
            },

            isActive() {
                return this.giftsLeft > 0;
            },

            needBuy() {
                return this.giftsLeft < this.giftNum;
            },

            needBuyPrice() {
                return (this.giftNum - this.giftsLeft) * this.rewardPerUser;
            },

            shareLink() {
                return `${process.env.VUE_APP_SITE}/w-${this.campaign.recipientId}`;
            },
        },

        methods: {
            async init() {
                const campaignId = this.$route.params.campaignId;
                if (!this.campaign || this.campaign.campaignId !== campaignId) {
                    await this.$store.dispatch(Types.loadCampaign, campaignId);
                }

                if (this.campaign) {
                    this.updateState();
                    this.name = this.campaign.name;
                    this.brandName = this.campaign.brandName;
                }
            },

            async updateState() {
                await this.$store.dispatch(Types.loadCampaign, this.campaign.campaignId);
                this.updateStateId = setTimeout(this.updateState, 5 * 1000);
            },

            async save() {
                console.log("save");
                if (this.name === this.campaign.name &&
                    this.rewardPerUser === this.campaign.rewardPerUser &&
                    this.giftNum === this.campaign.giftNum &&
                    this.brandName === this.campaign.brandName) {
                    return;
                }

                console.log("save start");

                this.saving = true;

                await this.$store.dispatch(Types.saveCampaign, {
                    campaignId: this.campaign.campaignId,
                    data: {
                        name: this.name,
                        brandName: this.brandName,
                        rewardPerUser: parseInt(this.rewardPerUser),
                        giftNum: parseInt(this.giftNum),
                    },
                });

                await sleep(500);

                this.saving = false;
            },

            saveBackground() {
                console.log("saveBackground");
                if (this.saveTimer) clearTimeout(this.saveTimer);
                this.saveTimer = setTimeout(() => {
                    this.save();
                }, 500);
            },


            back() {
                router.push(`/`);
            },
        },

        watch: {
            name() {
                this.saveBackground();
            },

            brandName() {
                this.saveBackground();
            },

            rewardPerUser() {
                this.saveBackground();
            },

            giftNum() {
                this.saveBackground();
            },
        },

        mounted() {
            this.init();
        },

        destroyed() {
            if (this.updateStateId) {
                clearTimeout(this.updateStateId);
            }
        },
    };
</script>
