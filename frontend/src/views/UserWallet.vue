<template>
    <wallet-layout>
        <loader v-if="!currentUser"/>

        <div class="row">
            <div class="col-sm-12 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4 campaign-admin" v-if="currentUser">

<!--                <transition name="fade">-->
                    <back-button :handler="spendBack" v-if="currentUser && currentSpend"/>
<!--                </transition>-->

                <div class="intro runout-of-gifts" v-if="isRunOutOfGifts">
                    All gifts <span v-if="currentUserCampaign.brandName">from {{ currentUserCampaign.brandName }}</span>
                    are already claimed
                </div>

<!--                <transition name="fade" mode="out-in">-->
                    <section v-if="!isRunOutOfGifts && !currentSpend">
                        <div class="balance-block">
                            <div class="title" v-if="campaign.type == 'single' && campaign.name">Hey, {{ campaign.name }}</div>
                            <div class="title">You have received</div>
                            <div class="balance">{{ balance }} {{ currentUserCampaign.coin }}</div>
                            <div class="balance-currency" v-if="localPrice">~{{ localPrice.price }} {{
                                localPrice.currency
                                }}
                            </div>
                            <div class="title" v-if="currentUserCampaign.brandName">from {{
                                currentUserCampaign.brandName }}
                            </div>
                        </div>
                    </section>
<!--                </transition>-->

<!--                <transition name="fade" mode="out-in">-->
                    <wallet-spend-details :user="currentUser" :spend-type="currentSpend"
                                          v-if="currentUser && currentSpend" @cancel="spendBack"/>
<!--                </transition>-->

                <section v-if="currentUser.balance > 0 && !currentSpend && !isRunOutOfGifts">
                    <div class="tabs">
                        <button class="button btn-tab" @click="showTab('spend')"
                                :class="{ active: currentTab === 'spend'}">
                            Spend
                        </button>
                        <button class="button btn-tab" @click="showTab('send')"
                                :class="{ active: currentTab === 'send'}">
                            Send
                        </button>
                    </div>

<!--                    <transition name="fade">-->
                        <div class="tab tab-spend" v-if="currentTab === 'spend'">
                            <div class="spend">
                                <button class="spend-card"
                                        v-for="item in spendTypes"
                                        :style="{ background: `url(/img/logo/${item.id}.png) no-repeat center center`, backgroundSize: 'cover' }"
                                        :key="item.id" @click="spend(item)"></button>
                            </div>
                        </div>
<!--                    </transition>-->
                </section>

<!--                <transition name="fade">-->
                    <div class="tab tab-send" v-if="currentTab === 'send'">
                        <div class="spend">
                            <wallet-spend-details :user="currentUser" :spend-type="transferSpendType"/>
                            <div class="tab-tip">If you haven't got any Minter wallet yet, you can create one in a few
                                seconds: <a class="bipto"
                                            href="https://www.bip.to" target="_blank" rel="noopener"><img
                                        src="../assets/bipto_logo.png"/></a></div>
                        </div>
                    </div>
<!--                </transition>-->
            </div>
        </div>
    </wallet-layout>
</template>

<script>

    import { Types, SpendTypes } from "@/store/wallet";
    import { mapState } from "vuex";
    import { generateId, sleep } from "@/utils";
    import ButtonAsync from "@/components/ButtonAsync";
    import WalletLayout from "@/layouts/WalletLayout";
    import Loader from "@/components/Loader";
    import WalletSpendDetails from "@/components/WalletSpendDetails";
    import BackButton from "@/components/BackButton";

    export default {
        components: {
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
                spendTypes: SpendTypes,
                currentSpend: null,
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
                    title: "Do you want to send <span>{amount}</span> {coin}?",
                    needAddress: true,
                    action: "Instant send",
                };
            },

            localPrice() {
                if (!this.currentUser || !this.campaign || !this.campaign.priceData) return null;
                return {
                    price: (this.currentUser.balance * this.campaign.priceData.price).toFixed(2),
                    currency: this.campaign.priceData.currency,
                };

            },


            ...mapState([
                Types.currentUser,
                Types.currentUserCampaign,

            ]),
        },

        methods: {
            async load() {
                const userId = this.$route.params.userId;

                await sleep(100);

                await Promise.all([
                    this.$store.dispatch(Types.loadUser, userId),
                ]);
            },

            showTab(tab) {
                this.currentTab = tab;
            },

            spend(spendType) {
                this.currentSpend = spendType;
            },

            spendBack() {
                this.currentSpend = null;
            },
        },

        mounted() {
            this.load();
        },

    };
</script>

<style lang="less">


</style>
