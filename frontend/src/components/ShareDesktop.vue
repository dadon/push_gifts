<template>
    <div class="share-block">
        <div class="row" v-if="isMobile">
            <div class="col-sm-12 campaign-admin-summary">
                <div class="share-text" v-if="!single">Push wallet for mass sharing:</div>
                <div class="share-text" v-if="single">Here is the push wallet for your friend:</div>
                <div class="share-link"><a :href="url" target="_blank">{{ url }}</a></div>
                <button class="button share-btn" @click="share">Share push wallet <br> with {{ giftSize }} {{ giftCoin
                    }}
                </button>
            </div>
        </div>

        <div class="row" v-if="!isMobile">
            <div class="col-sm-12 campaign-admin-desktop-share">
                <div class="share-text">Share push wallet with {{ giftSize }} {{ giftCoin }}</div>
                <div class="share-link"><a :href="url" target="_blank">{{ url }}</a></div>
                <div class="share-desktop-btns">
                    <button class="button share-desktop-btn" @click="shareTg"><img class="social" src="../assets/logo/tg_dark.svg"></button>
                    <button class="button share-desktop-btn" @click="shareTwitter"><img class="social" src="../assets/logo/twitter_dark.svg"></button>
                    <button class="button share-desktop-btn" @click="shareFb"><img class="social" src="../assets/logo/fb_dark.svg"></button>
                    <button class="button share-desktop-btn" @click="shareMail">email</button>
                    <button class="button share-desktop-btn" @click="shareSms" :class="{ active: smsActive }">sms
                    </button>
                    <button class="button share-desktop-btn" @click="shareCopy">copy</button>
                </div>

                <div class="sms-share" v-if="smsActive">
                    <div class="sms-input-block">
                        <div class="admin-input">
                            <input type="text" placeholder="enter phone  +38... " v-model="phone"/>
                        </div>
                    </div>
                    <button-async style-name="sms-send" :handler="sendSms" label="send"></button-async>
                </div>



                <input ref="urlInput" type="text" class="address-input-hidden" v-bind:value="url" readonly/>

                <span class="toast" v-if="copiedMessage">Link copied into clipboard</span>
            </div>
        </div>

        <div class="row" v-if="!isMobile">
            <div class="col-sm-12 campaign-admin-desktop-share">
                <div class="qr-wrapper">
                    <div class="tip">tap on QR to download image</div>
                    <a class="button share-desktop-qr" :href="QRcode" download="qr.png" v-if="QRcode">
                        <img class="qr-code" v-bind:src="QRcode" v-if="QRcode"/>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getWindowHeight, getWindowWidth, selectAllAndCopy } from "../utils/dom";
    import { sleep } from "../utils";
    import * as QRCode from "qrcode";
    import { isMobile } from "@/utils/dom";
    import ButtonAsync from "@/components/ButtonAsync";
    import * as api from "@/api";

    export default {
        components: {
            ButtonAsync,
        },

        props: {
            giftSize: String,
            giftCoin: String,
            url: String,
            single: Boolean,
        },

        data() {
            return {
                copiedMessage: false,
                QRcode: null,
                isMobile: isMobile(),
                smsActive: false,
                phone: null,
            };
        },

        methods: {
            share() {
                if (navigator.share) {
                    navigator.share({
                        title: "Push.gifts",
                        text: `It's a push wallet with coins, that can be spent on phone refill or gift cards`,
                        url: this.url,
                    })
                        .then(() => console.log("Successful share"))
                        .catch((error) => console.log("Error sharing", error));
                } else {
                    // show share text
                }
            },

            shareTg() {
                window.open(`tg://msg_url?text=It's a push wallet with coins, that can be spent on phone refill or gift cards&url=${encodeURIComponent(this.url)}`);
            },

            shareFb() {
                const windowWidth = getWindowWidth();
                const windowHeight = getWindowHeight();
                const width = 575;
                const height = 400;
                const left = (windowWidth - width) / 2;
                const top = (windowHeight - height) / 2;

                const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`;

                window.open("https://www.facebook.com/sharer/sharer.php?u=" + this.url, "facebook-share-dialog", opts);
            },

            shareTwitter() {
                const windowWidth = getWindowWidth();
                const windowHeight = getWindowHeight();
                const width = 575;
                const height = 400;
                const left = (windowWidth - width) / 2;
                const top = (windowHeight - height) / 2;

                const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`;

                window.open("https://twitter.com/share?text=" + `It's a push wallet with coins, that can be spent on phone refill or gift cards:` + `&url=${this.url}`,
                    "twitter-share-dialog",
                    opts);
            },

            shareMail() {
                window.open(`mailto:?subject=You have received new Push Gift&body=It's a web push wallet with coins, that can be spent on phone refill or gift cards: \n${this.url}`);
            },

            shareSms() {
                this.smsActive = !this.smsActive;
            },

            async shareCopy() {
                const result = selectAllAndCopy(this.$refs.urlInput);
                if (!result) return;
                this.copiedMessage = true;
                await sleep(1000);
                this.copiedMessage = false;
            },

            async sendSms() {
                let message = `Here is a push wallet for you:\n${this.url}\nIt's a universal web gift card, that you can spend on mobile refills or digital gift cards`;

                const response = await api.post("misc/sms", {
                    phone: this.phone,
                    message: message,
                });

                this.smsActive = false;
            },
        },

        computed: {},

        async mounted() {
            this.QRcode = await QRCode.toDataURL(this.url, {
                width: 200,
                height: 200,
            });
        },
    };
</script>
