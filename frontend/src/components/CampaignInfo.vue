<template>
    <section>
        <span class="toast" v-if="saving">Saving...</span>

        <div class="row">
            <div class="col-sm-12 col-md-7">
                <div class="campaign-info">
                    <div class="campaign-label">
                        <span>Sharing name: </span>
                        <input type="text" v-model="name" class="campaign-inline-input">
                    </div>

                    <div class="campaign-label">
                        <span>Your name: </span>
                        <input type="text" v-model="brandName" class="campaign-inline-input brand-name">
                    </div>

                    <div class="campaign-label">
                        <span>Sharing balance: {{ campaign.balance }} {{ campaign.coin }}</span>
                        <button class="small add" @click="showRefill">add</button>
                    </div>

                    <div class="campaign-label">
                        <span>Single gift size: </span>
                        <input type="number" v-model="rewardPerUser" class="campaign-inline-input gift-size">
                    </div>

                    <div class="campaign-label">Max amount of gifts: {{ maxGifts }}</div>
                </div>
            </div>

            <div class="col-sm-12 col-md-5" v-if="qrcode">
                <div class="link-parent">
                    <div class="campaign-label">
                        <span>Link: </span>
                        <a class="campaign-link" target="_blank" :href="link">{{ link }}</a>
                    </div>

                    <img class="qr" v-bind:src="qrcode"/>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
    import QRCode from "qrcode";
    import {Types} from "../store/admin";
    import {sleep} from "../utils";

    export default {
        props: {
            campaign: Object,
        },

        data() {
            return {
                name: null,
                brandName: null,
                rewardPerUser: 0,
                qrcode: null,
                saving: false,
                saveTimer: -1,
            };
        },

        computed: {
            currentName() {
                if (this.name && this.name.length) return this.name;
                return this.campaign.name;
            },

            currentRewardPerUser() {
                if (this.rewardPerUser) return this.rewardPerUser;
                return this.campaign.rewardPerUser;
            },

            campaignName() {
                let name = this.currentName;

                if (name) {
                    return "for " + name;
                }

                return this.campaign.campaignId;
            },

            maxGifts() {
                if (!this.campaign.balance) return 0;
                return Math.floor(this.campaign.balance / this.currentRewardPerUser);
            },

            link() {
                return `${process.env.VUE_APP_SITE}/c/${this.campaign.campaignPublicId}`;
            },
        },

        methods: {
            async save() {
                const name = this.currentName;
                const rewardPerUser = this.currentRewardPerUser;

                if (name === this.campaign.name && rewardPerUser === this.campaign.rewardPerUser && this.brandName === this.campaign.brandName) {
                    return;
                }

                this.saving = true;

                await this.$store.dispatch(Types.saveCampaign, {
                    campaignId: this.campaign.campaignId,
                    data: {
                        name,
                        brandName: this.brandName,
                        rewardPerUser,
                    },
                });

                await sleep(500);

                this.saving = false;
            },

            saveBackground() {
                if (this.saveTimer) clearTimeout(this.saveTimer);
                this.saveTimer = setTimeout(() => {
                    this.save();
                }, 500);
            },

            showRefill() {
                this.$store.dispatch(Types.showRefill, true);
            }
        },

        watch: {
            name() {
                this.saveBackground();
            },

            rewardPerUser() {
                this.saveBackground();
            },

            brandName() {
                this.saveBackground();
            },
        },

        async mounted() {
            this.name = this.campaign.name;
            this.brandName = this.campaign.brandName;
            this.rewardPerUser = this.campaign.rewardPerUser;

            this.qrcode = await QRCode.toDataURL(this.link, {
                width: 300,
                height: 300,
            });
        },
    };
</script>
