<template>
    <admin-layout>
        <div class="campaign-admin-wrapper">
            <div class="container campaign-page">
                <h2>Manage your wallets</h2>
                <div class="admin-text">Manage your Minter wallets, connected to your Sharings.</div>

            </div>
        </div>
    </admin-layout>
</template>

<script>
    import ButtonAsync from "@/components/ButtonAsync";
    import { Types } from "@/store/admin";
    import AdminLayout from "@/layouts/AdminLayout";

    export default {
        components: {
            AdminLayout,
            ButtonAsync,
        },

        methods: {
            async createCampaignClick() {
                return this.$store.dispatch(Types.createCampaign);
            },
        },
    };
</script>
