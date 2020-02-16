<template>
    <button class="button back-btn" @click="click">
        <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="51" height="37" >
                <path d="M 25.5 4.5 L 4.5 18.5 L 25.5 32" fill="transparent" stroke-width="3.64"
                      stroke="hsl(0, 0%, 99%)" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </i><span>back
    </span>
    </button>
</template>

<script>
    export default {
        props: {
            handler: Function,
        },

        methods: {
            click() {
                if (this.handler) this.handler();
            },
        },
    };
</script>
