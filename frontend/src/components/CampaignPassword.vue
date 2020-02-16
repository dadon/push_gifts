<template>
    <div class="row">
        <div class="col-sm-12 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4">

            <div class="intro runout-of-gifts" v-if="campaign.runOutOfGifts">
                All gifts <span v-if="campaign.brandName">from {{ campaign.brandName }}</span>
                <br>
                are already claimed
            </div>

            <section v-if="!campaign.runOutOfGifts">
                <div class="balance-block">
                    <div class="title">You have found a gift</div>
                    <div class="balance">{{ campaign.rewardPerUser }} {{ campaign.coin }}</div>
                    <div class="balance-currency" v-if="localPrice">~{{ localPrice.price }} {{ localPrice.currency }}
                    </div>
                    <div class="title" v-if="campaign.brandName">from {{ campaign.brandName }}
                    </div>
                </div>

                <div class="content-block">
                    <section v-if="campaign.passwordHint">
                        <div class="password-hint">{{ campaign.passwordHint }}</div>
                    </section>

                    <section v-if="successMessage">
                        <div class="spend-success-message">Success!</div>
                    </section>

                    <section v-if="!successMessage">
                        <label class="login-label">Enter password</label>
                        <input type="text" placeholder="" v-model="password">

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
</template>

<script>
    import ButtonAsync from "@/components/ButtonAsync";
    import Loader from "@/components/Loader";
    import WalletLayout from "@/layouts/WalletLayout";
    import { SpendTypes, Types } from "@/store/wallet";
    import { mapState } from "vuex";
    import { sha256 } from "@/utils/dom";
    import { sleep } from "@/utils";

    export default {
        props: {
            campaign: Object,
        },

        components: {
            ButtonAsync,
            Loader,
            WalletLayout,
        },

        data() {
            return {
                password: null,
                successMessage: false,
                errorMessage: false,
                spendTypes: SpendTypes,
                rnd: Math.random(),
            };
        },

        computed: {
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


                if (!this.password || !this.password.length) {
                    this.errorMessage = "Please enter something";
                    return;
                }

                const hash = await sha256(this.password);

                if (this.currentUser.passwordHash !== hash) {
                    this.errorMessage = "Invalid password";
                    return;
                }

                this.successMessage = true;


                await sleep(1000);

                await this.$store.commit(Types.walletPassword, this.password);
            },
        },

    };
</script>
