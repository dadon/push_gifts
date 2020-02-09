<template>
    <div class="content-block">
        <div class="spend-title big" v-if="!spendType.title">Not available yet</div>
        <div class="spend-title" v-if="!spendType.title">Waiting for integration with bitrefill.com</div>
        <div class="spend-success-message" v-if="successMessage">{{ successMessage }}</div>

        <section v-if="!successMessage && spendType.title">
            <div class="spend-title" v-html="title"></div>

            <div class="slider-wrapper">
                <input type="range" class="slider" min="1" max="100" v-model="value"/>
            </div>

            <div class="login-input-block" v-if="spendType.needPhone">
                <input type="text" placeholder="Enter phone +7..." v-model="phone">
            </div>

            <div class="login-input-block" v-if="spendType.needAddress">
                <input type="text" placeholder="Enter Minter address Mx..." v-model="address">
            </div>

            <div class="spend-error-message" v-if="errorMessage">{{ errorMessage }}</div>



            <div style="text-align: center">
                <ButtonAsync :label="spendType.action" :handler="spend" style-name="instant-send-btn"></ButtonAsync>
            </div>
        </section>
        <div style="text-align: center">
            <button class="button instant-send-btn" @click="spendBack" v-if="successMessage || !spendType.title">ok</button>
        </div>
    </div>
</template>

<script>
    import { generateId, sleep } from "@/utils";
    import { Types } from "@/store/wallet";
    import ButtonAsync from "@/components/ButtonAsync";
    import { sha256 } from "@/utils/dom";
    import * as api from "@/api";

    export default {
        components: {
            ButtonAsync,
        },

        props: {
            user: Object,
            spendType: Object,
        },

        data() {
            return {
                value: 100,
                phone: null,
                address: null,
                successMessage: null,
                errorMessage: null,
            };
        },

        computed: {
            coin() {
                return this.$store.state[Types.currentUserCampaign].coin;
            },

            title() {
                let title = this.spendType.title;
                title = title.replace("{amount}", this.amount.toFixed(2));
                title = title.replace("{coin}", this.coin);
                return title;
            },

            amount() {
                return this.user.balance * this.value / 100;
            },
        },

        methods: {
            async spend() {
                console.log("spend", this.spendType.id);

                this.errorMessage = null;

                if (this.spendType.id === "timeloop") {
                    return this.spendToTime();
                } else if (this.spendType.id === "bip2phone") {
                    return this.spendToPhone();
                } else if (this.spendType.id === "send") {
                    return this.spendToTransfer();
                }
            },

            spendBack() {
                this.$emit("cancel");
            },

            async spendToPhone() {
                const response = await api.post(`check-phone`, { phone: this.phone });

                if (response.success) {

                    const priceInBip = this.$store.state[Types.currentUserCampaign].coinToBip * this.amount;
                    console.log(priceInBip, "priceInBip");

                    if (priceInBip < response.minbip) {
                        const minAmount = response.minbip / this.$store.state[Types.currentUserCampaign].coinToBip;
                        this.errorMessage = `Error. Minimal refill amount ${minAmount.toFixed(2)} ${this.coin}.`;
                        return;
                    }

                    const success = await this.$store.dispatch(Types.spend, {
                        type: this.spendType.id,
                        toAddress: this.spendType.address,
                        payload: response.keyword,
                        amount: this.amount,
                    });

                    this.successMessage = `Success. Your phone will be refilled within 30 minutes.`;
                } else {
                    this.errorMessage = `Error. Invalid phone number`;
                }
            },

            async spendToTime() {
                const giftId = generateId(8);
                const giftHash = await sha256(giftId);

                const success = await this.$store.dispatch(Types.spend, {
                    type: this.spendType.id,
                    toAddress: this.spendType.address,
                    payload: giftHash,
                    amount: this.amount,
                });

                if (success) {
                    console.log("giftId", giftId);
                    location.href = `https://timeloop.games/m/?gift=${giftId}`;
                } else {
                    this.errorMessage = `Error. Please try again later.`;
                }
            },


            async spendToTransfer() {
                if (!(this.address && this.address.startsWith("Mx") && this.address.length === 42)) {
                    this.errorMessage = "Error. Invalid minter address";
                    return;
                }

                const success = await this.$store.dispatch(Types.spend, {
                    type: this.spendType.id,
                    toAddress: this.address,
                    amount: this.amount,
                });

                if (success) {
                    this.successMessage = "Success.";
                } else {
                    this.errorMessage = "Error. Please try again later.";
                }


            },
        },

        mounted() {
            this.successMessage = null;
            this.errorMessage = null;
            this.phone = this.user.phone || null;
        },
    };
</script>
