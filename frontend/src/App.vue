<template>
    <div id="app">
        <div class="nav">
            <div class="logo"><a :href="siteUrl">Push.gifts</a></div>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        computed: {
            siteUrl() {
                return process.env.VUE_APP_SITE;
            },
        },
    };
</script>
