<template>
    <div class="container">
        <loader v-if="!currentUserCampaign"/>

        <div class="row">
            <div class="col-sm-12 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4 user-wallet-header"
                 v-if="currentUserCampaign">
                <div class="intro">You have found a gift</div>
                <div class="balance">{{ currentUserCampaign.rewardPerUser }} {{ currentUserCampaign.coin }}</div>
                <div class="balance-currency" v-if="localPrice">~{{ localPrice.price }} {{ localPrice.currency }}</div>
                <div class="intro-from" v-if="currentUserCampaign.brandName">From {{ currentUserCampaign.brandName }}</div>

                <div class="content-block">
                    <section v-if="successMessage">
                        <div class="spend-success-message">Please wait the message with a link</div>
                    </section>

                    <section v-if="!successMessage">
                        <div class="login-input-block">
                            <label class="login-label">Enter your email address</label>
                            <input type="email" placeholder="keyser@soze.com" v-model="email">
                        </div>

                        <div class="login-input-block">
                            <label class="login-label">or phone number</label>
                            <input type="text" placeholder="+7..." v-model="phone">
                        </div>

                        <ButtonAsync label="Claim gift" style-name="login-btn" :handler="send"/>
                    </section>
                </div>

                <div class="spend">
                    <div class="spend-tip">You will be able to spend them on phone refills and gift cards</div>
                    <div class="spend-card no-active"
                         v-for="item in spendTypes"
                         :style="{ background: `url(/img/logo/${item.id}.png) no-repeat center center`, backgroundSize: 'contain' }"
                         :key="item.id"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ButtonAsync from "@/components/ButtonAsync";
    import Loader from "@/components/Loader";
    import { SpendTypes, Types } from "@/store/wallet";
    import { mapState } from "vuex";

    export default {
        components: {
            ButtonAsync,
            Loader,
        },

        data() {
            return {
                email: null,
                phone: null,
                successMessage: false,
                errorMessage: false,
                spendTypes: SpendTypes,
            };
        },

        computed: {
            campaign() {
                return this[Types.currentUserCampaign];
            },

            localPrice() {
                if (!this.campaign || !this.campaign.priceData) return null;
                return {
                    price: (this.campaign.rewardPerUser * this.campaign.priceData.price).toFixed(2),
                    currency: this.campaign.priceData.currency,
                };

            },

            ...mapState([
                Types.currentUser,
                Types.currentUserCampaign,

            ]),
        },

        methods: {
            async send() {
                if (!this.email && !this.phone) {
                    return;
                }
                const success = await this.$store.dispatch(Types.createUser, {
                    campaignPublicId: this.$route.params.campaignPublicId,
                    userInfo: {
                        email: this.email,
                        phone: this.phone,
                    },
                });

                if (success) {
                    this.successMessage = true;
                }
            },

            async load() {
                const campaignPublicId = this.$route.params.campaignPublicId;
                await this.$store.dispatch(Types.loadPublicCampaign, campaignPublicId);

            },
        },

        mounted() {
            this.load();
        },

    };
</script>
