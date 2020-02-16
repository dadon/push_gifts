<template>
    <wallet-layout>

        <loader v-if="!currentUserCampaign"/>

        <div class="row">
            <div class="col-sm-12 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4"
                 v-if="currentUserCampaign">

                <div class="intro runout-of-gifts" v-if="campaign.runOutOfGifts">
                    All gifts <span v-if="currentUserCampaign.brandName">from {{ currentUserCampaign.brandName }}</span>
                    are already claimed
                </div>

                <section v-if="!campaign.runOutOfGifts">
                    <div class="balance-block">
                        <div class="title">You have found a gift</div>
                        <div class="balance">{{ currentUserCampaign.rewardPerUser }} {{ currentUserCampaign.coin }}</div>
                        <div class="balance-currency" v-if="localPrice">~{{ localPrice.price }} {{ localPrice.currency }}</div>
                        <div class="title" v-if="currentUserCampaign.brandName">from {{ currentUserCampaign.brandName }}</div>
                    </div>

                    <div class="content-block">
                        <section v-if="successMessage">
                            <div class="spend-success-message">Please wait for the message with a link</div>
                        </section>

                        <section v-if="!successMessage">
                            <label class="login-label">Enter your phone number</label>
                            <input type="text" placeholder="+38..." v-model="phone">

                            <div class="spend-error-message" v-if="errorMessage">{{ errorMessage }}</div>

                            <div class="content-actions">
                                <ButtonAsync label="Claim gift" style-name="login-btn" :handler="send"/>
                            </div>
                        </section>
                    </div>

                    <div class="spend">
                        <div class="title">You will be able to spend them on phone refills and gift cards</div>
                        <button class="spend-card no-active"
                             v-for="item in spendTypes"
                             :style="{ background: `url(/img/logo/${item.id}.png?r=${rnd}) no-repeat center center`, backgroundSize: 'cover' }"
                             :key="item.id"></button>
                    </div>
                </section>
            </div>
        </div>
    </wallet-layout>
</template>

<script>
    import ButtonAsync from "@/components/ButtonAsync";
    import Loader from "@/components/Loader";
    import WalletLayout from "@/layouts/WalletLayout";
    import { SpendTypes, Types } from "@/store/wallet";
    import { mapState } from "vuex";

    export default {
        components: {
            ButtonAsync,
            Loader,
            WalletLayout,
        },

        data() {
            return {
                email: null,
                phone: null,
                successMessage: false,
                errorMessage: false,
                spendTypes: SpendTypes,
                rnd: Math.random()
            };
        },

        computed: {

            campaign() {
                return this[Types.currentUserCampaign];
            },

            localPrice() {
                if (!this.campaign || !this.campaign.priceInfo) return null;
                return {
                    price: (this.campaign.rewardPerUser * this.campaign.priceInfo.price).toFixed(2),
                    currency: this.campaign.priceInfo.currency,
                };
            },

            ...mapState([
                Types.currentUser,
                Types.currentUserCampaign,

            ]),
        },

        methods: {
            async send() {
                this.errorMessage = null;

                if (!this.email && !this.phone) {
                    this.errorMessage = "Invalid phone number";
                    return;
                }

                const success = await this.$store.dispatch(Types.createUser, {
                    campaignPublicId: this.$route.params.campaignPublicId,
                    email: this.email,
                    phone: this.phone,
                });

                if (success) {
                    this.successMessage = true;
                }
            },

            async load() {
                const campaignPublicId = this.$route.params.campaignPublicId;
                await this.$store.dispatch(Types.loadPublicCampaign, campaignPublicId)
            },
        },

        mounted() {
            this.load();
        },

    };
</script>
