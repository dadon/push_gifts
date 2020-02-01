<template>
    <div class="container">
        <loader v-if="!(currentUser && currentUserCampaign)"/>

        <div class="row">
            <div class="col-sm-12 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4 user-wallet-header"
                 v-if="currentUser && currentUserCampaign">
                <div class="intro">You have received</div>
                <div class="balance">{{ balance }} {{ currentUserCampaign.coin }}</div>
                <div class="balance-currency" v-if="localPrice">~{{ localPrice.price }} {{ localPrice.currency }}</div>
                <div class="intro-from" v-if="currentUserCampaign.brandName">From {{ currentUserCampaign.brandName }}</div>


                <wallet-spend-details :user="currentUser" :spend-type="currentSpend"
                                      v-if="currentUser && currentSpend " @cancel="spendBack"/>


                <section v-if="currentUser.balance > 0 && !currentSpend">
                    <div class="tabs">
                        <button class="btn btn-tab" @click="showTab('spend')"
                                :class="{ active: currentTab === 'spend'}">
                            Spend
                        </button>
                        <button class="btn btn-tab" @click="showTab('send')" :class="{ active: currentTab === 'send'}">
                            Send
                        </button>
                    </div>

                    <div class="tab tab-spend" v-if="currentTab === 'spend'">
                        <div class="spend-card"
                             v-for="item in spendTypes"
                             :style="{ background: `url(/img/logo/${item.id}.png) no-repeat center center`, backgroundSize: 'contain' }"
                             :key="item.id" @click="spend(item)">
                        </div>
                    </div>
                </section>

                <div class="tab tab-send" v-if="currentTab === 'send'">
                    <wallet-spend-details :user="currentUser" :spend-type="transferSpendType"/>
                    <div class="tab-tip">If you haven't got any Minter wallet yet, you can create one in a few
                        seconds: <a class="bipto"
                                    href="https://www.bip.to" target="_blank" rel="noopener"><img
                                src="../assets/bipto_logo.png"/></a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { Types, SpendTypes } from "@/store/wallet";
    import { mapState } from "vuex";
    import { generateId, sleep } from "@/utils";
    import ButtonAsync from "@/components/ButtonAsync";
    import Loader from "@/components/Loader";
    import WalletSpendDetails from "@/components/WalletSpendDetails";

    export default {
        components: {
            ButtonAsync,
            WalletSpendDetails,
            Loader,
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
                    action: "Instant send"
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
                const campaignPublicId = this.$route.params.campaignPublicId;
                const userId = this.$route.params.userId;

                await sleep(100);

                await Promise.all([
                    this.$store.dispatch(Types.loadUser, userId),
                    this.$store.dispatch(Types.loadPublicCampaign, campaignPublicId),
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
