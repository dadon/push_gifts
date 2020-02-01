<template>
    <div>
        <sidebar/>
        <div class="campaign-admin-wrapper">
            <div class="container campaign-page landing">
                <p class="admin-text">Create new sharing to send gifts to any number of people</p>
                <p class="admin-text">Gifts - are the loyalty points or virtual currency, based on <a href="https://www.minter.network" rel="noopener" target="_blank">Minter network</a> coins</p>
                <ButtonAsync label="Create New Sharing" :handler="createCampaignClick" style-name="create-campaign-btn"/>
                <p class="admin-text">Gifts are liquid and can be instantly spent</p>
                <p class="admin-text">Recipients don't need to download any apps, they can use the points directly in the web push wallet.</p>
                <p class="admin-text">To purchase Minter coins visit: <a href="https://bip.dev/card" rel="noopener" target="_blank">https://bip.dev/card</a></p>
            </div>
        </div>
    </div>
</template>

<script>
    import ButtonAsync from "@/components/ButtonAsync";
    import Sidebar from "@/components/Sidebar";
    import { Types } from "@/store/admin";

    export default {
        components: {
            ButtonAsync,
            Sidebar,
        },

        methods: {
            async createCampaignClick() {
                return this.$store.dispatch(Types.createCampaign);
            },
        },
    };
</script>
