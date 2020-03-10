<template>
    <div class="row">
        <div class="col-sm-12" >
            <div class="title">Current balance: {{ campaign.balance }} {{ campaign.coin }}</div>
            <div class="info">
                <p>To top up sharing balance, send Minter coins to this address:</p>
                <p>{{ campaign.address }}</p>
                <img class="qr" v-bind:src="qrcode"/>
                <div class="inline"><loader/></div>
                <div>
                    <button class="instant-send-btn cancel" @click="hide">return</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Types} from "@/store/admin";
    import Loader from "@/components/Loader";
    import QRCode from "qrcode";

    export default {
        components: {
            Loader,
        },

        props: {
            campaign: Object,
        },

        data() {
            return {
                updateStateId: -1,
                qrcode: null,
            }
        },

        methods: {
            hide() {
                this.$store.dispatch(Types.showRefill, false);
            },

            async updateState() {
                await this.$store.dispatch(Types.loadCampaign, this.campaign.campaignId);
                this.updateStateId = setTimeout(this.updateState, 2 * 1000);
            },
        },

        async mounted() {
            this.updateState();

            this.qrcode = await QRCode.toDataURL(this.campaign.address, {
                width: 300,
                height: 300,
            });
        },

        destroyed() {
            if (this.updateStateId) {
                clearTimeout(this.updateStateId);
            }
        }

    }
</script>

<style scoped>
    .title {
        text-align: center;
    }

    .info {
        text-align: center;
    }
</style>
