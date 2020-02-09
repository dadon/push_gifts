<template>
    <div id="app">
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
