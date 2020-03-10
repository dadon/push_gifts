<template>
    <div class="content-block">
        <div class="spend-success-message" v-if="successMessage">{{ successMessage }}</div>

        <section v-if="!successMessage">
            <div v-if="spendType.items" class="radio-parent">
                <span v-for="item in spendType.items">
                    <input :id="item.type" type="radio" name="radio" v-model="selectedItem" :value="item.type">
                    <label :for="item.type" class="radio-label"><span class="checkmark"></span>{{ _("label_" + item.type) }}</label>
                </span>
            </div>

            <div class="spend-title" v-html="title"></div>

            <div class="slider-wrapper" v-if="!price">
                <vue-slider v-model="value" tooltip="none" :min="1" :max="100"/>
            </div>

            <div class="login-input-block" v-if="spendType.needPhone">
                <input type="text" :placeholder="_('placeholder_phone')" v-model="phone">
            </div>

            <div class="login-input-block" v-if="spendType.needAddress">
                <input type="text" :placeholder="_('placeholder_minter')" v-model="address" autocomplete="username">
            </div>

            <div class="spend-error-message" v-if="errorMessage">{{ errorMessage }}</div>

            <div style="text-align: center">
                <ButtonAsync :label="_(`spend_action_` + spendType.type)" :handler="spend"
                             style-name="instant-send-btn"></ButtonAsync>
            </div>
        </section>

        <div class="gift-code" v-if="giftCode" @click="copyGiftCode">
            <input ref="addressInput" type="text" class="address-input-hidden" v-bind:value="giftCode" readonly/>
            {{ giftCode }} <div class="copy-button"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="40"><path d="M 8.7 9.708 L 26.35 9.708 L 26.35 30.638 L 8.7 30.638 Z" fill="transparent" stroke-width="2" stroke="rgba(249, 189, 84, 1.00)"></path><path d="M 5.17 23.08 L 5.17 5.638 L 20.467 5.638" fill="transparent" stroke-width="2" stroke="rgba(249, 189, 84, 1.00)" stroke-linecap="square"></path></svg></div>
        </div>
        <div style="text-align: center" v-if="applyGiftLink">
            <a class="button" :href="applyGiftLink" v-if="applyGiftLink">{{ _("spend_success_gift") }}</a>
        </div>
    </div>
</template>

<script>
    import VueSlider from "vue-slider-component";
    import { mapState } from "vuex";
    import { generateId, sleep } from "@/utils";
    import { Types } from "@/store/wallet";
    import ButtonAsync from "@/components/ButtonAsync";
    import { selectAllAndCopy, sha256 } from "@/utils/dom";
    import * as api from "@/api";
    import localization from "@/utils/localization";

    export default {
        components: {
            ButtonAsync,
            VueSlider,
        },

        props: {
            spendType: Object,
        },

        data() {
            return {
                value: 100,
                phone: null,
                address: null,
                successMessage: null,
                errorMessage: null,
                selectedItem: null,
                applyGiftLink: null,
                giftCode: null,
            };
        },

        computed: {
            coin() {
                return this.$store.state[Types.currentUserCampaign].coin;
            },

            price() {
                let price = 0;
                if (this.spendTypeOrItem && this.spendTypeOrItem.priceUsd) {
                    price = this.spendTypeOrItem.priceUsd / this.campaign.priceInfo.priceUsd;
                    price += price * 0.2;
                }
                return price;
            },

            spendTypeOrItem() {
                let item = this.spendType;
                if (this.spendType.items && this.selectedItem) {
                    item = this.spendType.items.find(el => el.type === this.selectedItem);
                }
                return item;
            },

            title() {
                let item = this.spendTypeOrItem;
                let amount = this.amount;
                let price = this.price;
                if (price) {
                    amount = price;
                }
                return localization.get(`spend_title_` + item.type, {
                    amount: amount.toFixed(2),
                    coin: this.coin,
                }, true);
            },


            amount() {
                return this.user.balance * this.value / 100;
            },

            campaign() {
                return this[Types.currentUserCampaign];
            },

            user() {
                return this[Types.currentUser];
            },

            ...mapState([
                Types.currentUser,
                Types.currentUserCampaign,
            ]),
        },

        methods: {
            copyGiftCode() {
                const result = selectAllAndCopy(this.$refs.addressInput);
            },

            async spend() {
                console.log("spend", this.spendType.type);

                this.errorMessage = null;

                if (this.spendType.type === "timeloop") {
                    return this.spendToTime();
                } else if (this.spendType.type === "bip2phone") {
                    return this.spendToPhone();
                } else if (this.spendType.type === "send") {
                    return this.spendToTransfer();
                } else if (this.spendType.giftCard) {
                    return this.spendToGiftCard();
                }
            },

            spendBack() {
                this.$emit("cancel");
            },

            async spendToPhone() {
                const response = await api.post(`misc/register-phone`, { phone: this.phone });
                console.log(response);

                if (response) {

                    const priceInBip = this.$store.state[Types.currentUserCampaign].coinToBip * this.amount;
                    console.log(priceInBip, "priceInBip");

                    if (priceInBip < response.minbip) {
                        const minAmount = response.minbip / this.$store.state[Types.currentUserCampaign].coinToBip;
                        this.errorMessage = `Error. Minimal refill amount ${minAmount.toFixed(2)} ${this.coin}.`;
                        return;
                    }

                    const success = await this.$store.dispatch(Types.spend, {
                        type: this.spendType.type,
                        toAddress: this.spendType.address,
                        payload: response.keyword,
                        amount: this.amount,
                        convert: true,
                        password: this.$store.state[Types.walletPassword],
                    });

                    this.successMessage = localization.get("success_" + this.spendType.type);
                } else {
                    this.errorMessage = localization.get("error_phone_number");
                }
            },

            async spendToTime() {
                const giftId = generateId(8);
                const giftHash = await sha256(giftId);

                const success = await this.$store.dispatch(Types.spend, {
                    type: this.spendType.type,
                    toAddress: this.spendType.address,
                    payload: giftHash,
                    amount: this.amount,
                    password: this.$store.state[Types.walletPassword],
                });

                if (success) {
                    this.successMessage = localization.get("success_" + this.spendType.type);
                    await sleep(200);
                    location.href = `https://timeloop.games/m/?gift=${giftId}`;
                } else {
                    this.errorMessage = localization.get("error_base");
                }
            },

            async spendToGiftCard() {
                let price = this.price;

                if (price > this.user.balance) {
                    this.errorMessage = localization.get("error_no_coins");
                    return;
                }

                const response = await this.$store.dispatch("spendWithPayload", {
                    type: this.spendTypeOrItem.type,
                    toAddress: this.spendType.address,
                    password: this.$store.state[Types.walletPassword],
                });

                if (!response.success) {
                    this.errorMessage = localization.get("error_base");
                    return;
                }

                this.successMessage = localization.get("spend_success_" + this.spendTypeOrItem.type);
                this.giftCode = response.data.code;
                this.applyGiftLink = response.data.link.replace("{code}", this.giftCode);
            },

            async spendToTransfer() {
                if (!(this.address && this.address.startsWith("Mx") && this.address.length === 42)) {
                    this.errorMessage = localization.get("error_minter_address");
                    return;
                }

                const success = await this.$store.dispatch(Types.spend, {
                    type: this.spendType.type,
                    toAddress: this.address,
                    amount: this.amount,
                    password: this.$store.state[Types.walletPassword],
                });

                if (success) {
                    this.successMessage = localization.get("success_send");
                } else {
                    this.errorMessage = localization.get("error_base");
                }


            },
        },

        mounted() {
            this.successMessage = null;
            this.errorMessage = null;
            this.phone = this.user.phone || null;
            if (this.spendType.items) {
                this.selectedItem = this.spendType.items[0].type;
            } else {
                this.selectedItem = null;
            }
        },
    };
</script>
