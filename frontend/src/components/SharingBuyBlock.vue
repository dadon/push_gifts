<template>
    <div class="buy-block row">
        <div class="campaign-buy-btn-wrapper">
            <div class="tip">1. tap to copy</div>
            <button class="button campaign-buy-btn copy-address" @click="copyAddress">
                <div class="copied-message-wrapper" >
                    <div class="copied-message" :style="{ opacity: copiedMessage ? 1 : 0}">copied to clipboard</div>
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
            <div class="tip">2. paste in wallet</div>

            <a class="button campaign-buy-btn open-wallet" :href="buyDeepLink" target="_blank">
                Open <br> BIP wallet
            </a>
        </div>

        <div class=" share-desktop-qr" v-if="!isMobile && QRcode">
            <div class="tip">or scan this QR with mobile wallet</div>
            <img class="qr-code" v-bind:src="QRcode" v-if="QRcode" />
        </div>
    </div>
</template>

<script>
    import { isMobile, selectAllAndCopy } from "../utils/dom";
    import { sleep } from "../utils";
    import * as QRCode from "qrcode";

    export default {
        props: {
            address: String,
        },

        data() {
            return {
                hideAddress: false,
                copiedMessage: false,
                isMobile: isMobile(),
                QRcode: null,
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
                if (this.hideAddress) return;
                const result = selectAllAndCopy(this.$refs.addressInput);
                if (!result) return;
                this.hideAddress = true;
                await sleep(200);
                this.copiedMessage = true;
                await sleep(1000);
                this.copiedMessage = false;
                await sleep(100);
                this.hideAddress = false;
            },
        },

        async mounted() {
            this.QRcode = await QRCode.toDataURL(this.address, {
                width: 200,
                height: 200
            });
        }
    };
</script>
