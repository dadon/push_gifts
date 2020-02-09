<template>
    <div class="buy-block row">
        <div class="campaign-buy-btn-wrapper">
            <div class="tip">1. Tap to copy</div>
            <button class="button campaign-buy-btn copy-address" @click="copyAddress">
                <div class="copied-message-wrapper" :style="{ opacity: copiedMessage ? 1 : 0}">
                    <div class="copied-message">copied</div>
                </div>
                <div class="address-label" :style="{ opacity: hideAddress ? 0 : 1}">
                    <div class="address-prefix-wrapper">
                        <div class="address-prefix">Mx</div>
                    </div>
                    <input ref="addressInput" type="text" class="address-input-hidden" v-bind:value="address" readonly/>
                    <div>{{ addressLabel }}</div>
                </div>

            </button>
        </div>

        <div class="campaign-buy-btn-wrapper">
            <div class="tip">2. Paste in wallet</div>

            <a class="button campaign-buy-btn open-wallet" :href="buyDeepLink" target="_blank">
                Open <br> BIP wallet
            </a>
        </div>
    </div>
</template>

<script>
    import { isMobile, selectAllAndCopy } from "../utils/dom";
    import { sleep } from "../utils";

    export default {
        props: {
            address: String,
        },

        data() {
            return {
                hideAddress: false,
                copiedMessage: false,
            };
        },

        computed: {
            addressLabel() {
                const result = this.address.split("Mx")[1].match(/.{1,10}/g);
                return result.join("\n");
            },

            buyDeepLink() {
                if (isMobile()) {
                    return "minter:///";
                }
                return "https://wallet.bip.to/send";
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
        },

        methods: {
            async copyAddress() {
                const result = selectAllAndCopy(this.$refs.addressInput);
                if (!result) return;
                this.hideAddress = true;
                await sleep(100);
                this.copiedMessage = true;
                await sleep(1000);
                this.copiedMessage = false;
                await sleep(100);
                this.hideAddress = false;
            },
        },
    };
</script>
