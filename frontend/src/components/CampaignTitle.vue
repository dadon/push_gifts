<template>
    <div class="row">
        <div class="col-sm-12">
            <h1>Sharing {{ campaignName }}</h1>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            campaign: Object,
        },

        computed: {
            campaignName() {
                let name = this.campaign.name;

                if (name) {
                    return name;
                }

                return this.campaign.campaignId;
            },
        },
    };
</script>
