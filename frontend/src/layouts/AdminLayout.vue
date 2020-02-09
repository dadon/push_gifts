<template>
    <div>
<!--        <div class="nav">-->
<!--            <div class="logo"><a :href="siteUrl">Push.gifts</a></div>-->
<!--        </div>-->

<!--        <sidebar/>-->

        <div class="app-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import Sidebar from "../components/Sidebar";

    export default {
        components: {
            Sidebar,
        },

        computed: {
            siteUrl() {
                return process.env.VUE_APP_SITE;
            },
        },
    };
</script>
