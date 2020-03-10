import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "mini.css/dist/mini-default.css";
// import "./styles/index.less";

import "./styles/wallet2.less";
import "./styles/slider.less";
import localization from "@/utils/localization";
import { getLocale } from "@/utils/dom";

const FastClick = require("fastclick");

Vue.config.productionTip = false;

localization.setLanguage(getLocale());

Vue.mixin({
    methods: {
        _: (str, params, addLineBreak) => localization.get(str, params, addLineBreak),
    },
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");


if ("addEventListener" in document) {
    document.addEventListener(
        "DOMContentLoaded",
        function () {
            FastClick.attach(document.body);
        },
        false,
    );
}

console.log(localization.get("spend_title_timeloop", { amount: 123, coin: "TIME" }));
