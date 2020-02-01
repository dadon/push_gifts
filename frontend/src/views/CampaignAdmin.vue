<template>
    <div>
        <sidebar/>
        <div class="campaign-admin-wrapper">
            <div class="container campaign-admin">
                <loader v-if="!currentCampaign"/>

                <section v-if="currentCampaign">

                    <campaign-title :campaign="currentCampaign"/>

                    <div class="content-block">
                        <campaign-info :campaign="currentCampaign" v-if="!refillMode"/>

                        <campaign-add-balance :campaign="currentCampaign" v-if="refillMode"/>
                    </div>
                </section>


                <campaign-users :users="currentCampaignUsers"
                                v-if="currentCampaignUsers && currentCampaignUsers.length"/>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    import ButtonAsync from "@/components/ButtonAsync";
    import Sidebar from "@/components/Sidebar";
    import { Types } from "@/store/admin";
    import { sleep } from "@/utils";
    import CampaignInfo from "@/components/CampaignInfo";
    import CampaignUsers from "@/components/CampaignUsers";
    import Loader from "@/components/Loader";
    import CampaignTitle from "@/components/CampaignTitle";
    import CampaignAddBalance from "@/components/CampaignAddBalance";

    export default {
        components: {
            CampaignAddBalance,
            CampaignTitle,
            CampaignUsers,
            CampaignInfo,
            ButtonAsync,
            Loader,
            Sidebar
        },

        data() {
            return {
                updateStateId: -1,
            };
        },

        computed: {
            ...mapState([
                Types.currentCampaign,
                Types.currentCampaignUsers,
                Types.refillMode,
            ]),
        },

        methods: {
            async init() {

                const campaignId = this.$route.params.campaignId;
                if (!this.currentCampaign || this.currentCampaign.campaignId !== campaignId) {
                    await this.$store.dispatch(Types.loadCampaign, campaignId);
                }

                if (this.currentCampaign) {
                    this.updateState();
                }
            },

            async updateState() {
                // await this.$store.dispatch(Types.loadCampaign, this.currentCampaign.campaignId);
                // this.updateStateId = setTimeout(this.updateState, 5 * 1000);
            },
        },

        mounted() {
            this.init();
        },

        destroyed() {
            if (this.updateStateId) {
                clearTimeout(this.updateStateId);
            }
        },
    };
</script>

<style scoped>

</style>
