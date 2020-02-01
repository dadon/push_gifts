<template>
  <button class="btn" v-bind:class="styleName" @click="click">
    <span v-if="loading">Loading...</span>
    <span v-if="!loading">{{ label }}</span>
  </button class="btn">
</template>

<script>


    export default {
        data() {
            return {
                loading: false,
            };
        },

        props: {
            label: String,
            handler: Function,
            styleName: String,
        },

        methods: {
            async click() {
                if (this.loading) return;
                this.loading = true;
              try {
                    await this.handler();
                } catch (e) {
                    console.error("Button handler error", e);
                }
                this.loading = false;
            },
        },
    };
</script>
