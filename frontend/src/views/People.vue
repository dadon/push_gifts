<template>
    <div>
        <sidebar/>
        <div class="campaign-admin-wrapper">
            <div class="container campaign-page">

                <h2>Explore your audience</h2>
                <div class="admin-text">Connect to DMPs (data managing platforms) to get profiles on people that
                    claimed your gifts.
                </div>
                <div class="admin-text">And figure out what is the best offer you can make them with next
                    gift-email.
                </div>
                <img class="people" src="../assets/people.png">

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
