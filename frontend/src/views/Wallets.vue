<template>
    <div>
        <sidebar/>
        <div class="campaign-admin-wrapper">
            <div class="container campaign-page">
                <h2>Manage your wallets</h2>
                <div class="admin-text">Manage your Minter wallets, connected to your Sharings.</div>

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
            Sidebar
        },

        methods: {
            async createCampaignClick() {
                return this.$store.dispatch(Types.createCampaign);
            },
        },
    };
</script>
