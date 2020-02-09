<template>
    <admin-layout>
        <loader v-if="!campaign"/>

        <div class="row">
            <div class="col-sm-12 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4 campaign-admin" v-if="campaign">
                <back-button :handler="back"/>

                <transition name="fade">
                    <section v-if="isActive">
                        <div class="row">
                            <div class="col-sm-12 campaign-admin-summary">
                                <div class="summary">
                                    <span class="summary-label">Gifts left: </span>
                                    <span class="summary-value">{{ giftsLeft }}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </transition>
            </div>
        </div>

        <transition name="fade">
            <share-desktop :gift-size="campaign.rewardPerUser" :gift-coin="campaign.coin" :url="shareLink" v-if="isActive" :single="false"/>
        </transition>

        <div class="row">
            <div class="col-sm-12 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4 campaign-admin">
                <section>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="admin-input inline">
                                <label for="rewardPerUser">Size of one gift</label>
                                <input id="rewardPerUser" type="number" v-model="rewardPerUser"/>
                            </div>

                            <div class="admin-input inline">
                                <label for="giftNum">Gifts amount</label>
                                <input id="giftNum" type="number" v-model="giftNum"/>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="admin-input">
                                <label for="name">Sharing name</label>
                                <input id="name" type="text" v-model="name"/>
                            </div>
                            <div class="admin-input">
                                <label for="brandName">Brand name</label>
                                <input id="brandName" type="text" v-model="brandName"/>
                            </div>
                        </div>
                    </div>
                </section>

                <transition name="fade">
                    <section v-if="needBuy">
                        <h2>Send {{ needBuyPrice }} coins this address</h2>

                        <sharing-buy-block :address="campaign.address"/>

                        <div class="inline">
                            <loader v-if="campaign.waitForRefill"/>
                        </div>
                    </section>
                </transition>
            </div>
        </div>
    </admin-layout>
</template>

<script>
    import { mapState } from "vuex";
    import { prepareLink } from "minter-js-sdk/dist/index.min";

    import ButtonAsync from "@/components/ButtonAsync";
    import { Types } from "@/store/admin";
    import { sleep } from "@/utils";
    import CampaignInfo from "@/components/CampaignInfo";
    import CampaignUsers from "@/components/CampaignUsers";
    import Loader from "@/components/Loader";
    import CampaignTitle from "@/components/CampaignTitle";
    import CampaignAddBalance from "@/components/CampaignAddBalance";
    import AdminLayout from "@/layouts/AdminLayout";
    import { getWindowHeight, getWindowWidth, isMobile, selectAllAndCopy } from "@/utils/dom";
    import router from "@/router";
    import BackButton from "@/components/BackButton";
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

            addressLabel() {
                const result = this.campaign.address.split("Mx")[1].match(/.{1,10}/g);
                return result.join("\n");
            },

            copiedMessageStyle() {
                const result = {};
                if (this.copiedMessage) {
                    result["transform"] = "scale(1)";
                } else {
                    result["transform"] = "scale(0)";
                }

                return result;
            },

            shareLink() {
                return `${process.env.VUE_APP_SITE}/c-${this.campaign.campaignPublicId}`;
            },

            buyDeepLink() {
                let linkHost = undefined;

                if (isMobile()) {
                    linkHost = "minter:///";
                }

                const txParams = {
                    type: "0x01",
                    data: {
                        to: this.campaign.address,
                        // value: "0xc0",
                        coin: "",
                    },
                };

                if (this.campaign.coin) {
                    txParams.data["coin"] = this.campaign.coin;
                }

                return prepareLink(txParams, linkHost);
            },

            ...mapState([
                Types.currentCampaignUsers,
                Types.refillMode,
            ]),
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
                    this.rewardPerUser = this.campaign.rewardPerUser || 10;
                    this.giftNum = this.campaign.giftNum || 100;
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

            async copyAddress() {
                const result = selectAllAndCopy(this.$refs.addressInput);
                if (!result) return;
                this.copiedMessage = true;
                await sleep(1000);
                this.copiedMessage = false;
            },


            share() {
                if (navigator.share) {
                    navigator.share({
                        text: `Get your ${this.campaign.rewardPerUser} ${this.campaign.coin}`,
                        url: this.shareLink,
                    })
                        .then(() => console.log("Successful share"))
                        .catch((error) => console.log("Error sharing", error));
                } else {
                    // show share text
                }
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
