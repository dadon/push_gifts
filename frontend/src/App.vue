<template>
    <div id="app">
        <div class="page-container">
            <div class="content-wrap">
                <router-view/>
            </div>
            <footer class="footer">

                <transition name="fade">
                <div class="github-link-wrapper" v-if="footerVisible">
                    <div class="github-link">
                        <a href="https://github.com/dadon/push_gifts" target="_blank"><img
                                src="./assets/GitHub-Mark-Light-120px-plus.png"></a>
                    </div>
                </div>
                </transition>
            </footer>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                footerVisible: false,
            }
        },

        computed: {
            siteUrl() {
                return process.env.VUE_APP_SITE;
            },
        },

        methods: {
            checkFooterVisibility() {
                this.footerVisible = this.$route.name === "home";
            },
        },


        watch: {
            $route(to, from) {
                this.show = false;
                // console.log("rout", to, from);
                this.checkFooterVisibility();

            },
        },

        mounted() {
            this.checkFooterVisibility();
        }
    };
</script>
