<template>
    <wallet-layout>
        <loader v-if="!currentUser"/>

        <CampaignPassword v-if="isLocked" :campaign="campaign" :user="currentUser"/>

        <div class="row" v-if="!isLocked">
            <div class="col-sm-12" v-if="currentUser">
                <transition name="fade" mode="out-in" appear>
                    <div v-if="!isRunOutOfGifts && !currentSpend" key="one">
                        <div class="balance-block-bg"></div>
                        <div class="balance-block">
                            <div class="title">{{ _("wallet_title") }}</div>
                            <div class="balance">{{ balance }} {{ currentUserCampaign.coin }}</div>
                            <div class="balance-currency" v-if="localPrice">~{{ localPrice.price }} {{
                                localPrice.currency
                                }}
                            </div>
                        </div>

                        <div class="spend" v-if="currentUser.balance > 0">
                            <transition-group name="fade" tag="div" appear>
                                <button class="button select-spend"
                                        v-for="(item, i) in spendTypes"
                                        :key="i" @click="spend(item)"><div class="wrap">
                                    <div class="icon"><img  :src="spendIcon(item)"></div> {{ spendLabel(item) }}
                                </div></button>
                            </transition-group>
                        </div>
                    </div>

                    <div v-if="currentUser && currentSpend" key="two" class="spend-wrapper">
                        <back-button :handler="spendBack"/>
                        <div class="balance">{{ balance }} {{ currentUserCampaign.coin }}</div>
                        <wallet-spend-details :spend-type="currentSpend" @cancel="spendBack"
                                              key="two"/>
                    </div>
                </transition>

            </div>
        </div>
    </wallet-layout>
</template>

<script>

    import { Types } from "@/store/wallet";
    import { mapState } from "vuex";
    import { generateId, sleep } from "@/utils";
    import ButtonAsync from "@/components/ButtonAsync";
    import WalletLayout from "@/layouts/WalletLayout";
    import Loader from "@/components/Loader";
    import WalletSpendDetails from "@/components/WalletSpendDetails";
    import BackButton from "@/components/BackButton";
    import CampaignPassword from "@/components/CampaignPassword";
    import localization from "@/utils/localization";

    export default {
        components: {
            CampaignPassword,
            BackButton,
            ButtonAsync,
            WalletSpendDetails,
            Loader,
            WalletLayout,
        },

        data() {
            return {
                currentTab: "spend",
                addressToSend: null,
                spendLoading: false,
                // spendTypes: [],
                currentSpend: null,
                rnd: Math.random(),
            };
        },

        computed: {
            campaign() {
                return this[Types.currentUserCampaign];
            },

            isRunOutOfGifts() {
                if (this.campaign.type === "mass" && this.campaign.runOutOfGifts) {
                    return true;
                }

                return false;
            },

            user() {
                return this[Types.currentUser];
            },

            balance() {
                if (!this.user || !this.user.balance) return 0;

                let result = parseFloat(this.user.balance).toFixed(2);
                result = result.replace(".00", "");
                return result;
            },

            transferSpendType() {
                return {
                    id: "send",
                    title: "spend_title_transfer",
                    needAddress: true,
                    action: "spend_action_transfer",
                };
            },

            localPrice() {
                if (!this.currentUser || !this.campaign || !this.campaign.priceInfo) return null;
                return {
                    price: (this.currentUser.balance * this.campaign.priceInfo.price).toFixed(2),
                    currency: this.campaign.priceInfo.currency,
                };

            },

            isLocked() {
                if (this.campaign && this.currentUser.passwordHash && !this.walletPassword) {
                    return true;
                }

                return false;
            },

            ...mapState([
                Types.currentUser,
                Types.currentUserCampaign,
                Types.walletPassword,
                Types.spendTypes,
            ]),
        },

        methods: {
            async load() {
                const userId = this.$route.params.userId;

                await sleep(1000);

                await Promise.all([
                    this.$store.dispatch(Types.loadUser, userId),
                    this.$store.dispatch("loadSpendTypes", userId),
                ]);

                await this.showSpendItems();
            },

            async showSpendItems() {
                // this.spendTypes = [];
                // for (let el of SpendTypes) {
                //     // await sleep(100);
                //     this.spendTypes.push(el);
                // }
            },

            spendLabel(spendType) {
                let key = spendType.type;
                if (spendType.group) {
                    key = spendType.group;
                }
                return localization.get("label_" + key);
            },

            spendIcon(spendType) {
                let key = spendType.type;
                if (spendType.group) {
                    key = spendType.group;
                }
                return `/img/logo/${key}.png`;
            },

            spend(spendType) {
                this.currentSpend = spendType;
                // this.spendTypes = [];
            },

            spendBack() {
                this.currentSpend = null;
                this.showSpendItems();
            },
        },

        async mounted() {
            this.load();
        },
    };
</script>

<style lang="less">


</style>
