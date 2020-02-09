import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "mini.css/dist/mini-default.css";
// import "./styles/index.less";
// import Buefy from 'buefy';
// import 'buefy/dist/buefy.css';

import "./styles/wallet2.less";
import "./styles/slider.less";


// const Fingerprint2 = require("fingerprintjs2");

// import * as Fingerprint2 from "fingerprintjs2/fingerprint2.js";

const FastClick = require("fastclick");

Vue.config.productionTip = false;

// Vue.use(Buefy);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");

// if (window.requestIdleCallback) {
//     requestIdleCallback(function () {
//         Fingerprint2.get(function (components) {
//             console.log(components) // an array of components: {key: ..., value: ...}
//         })
//     })
// } else {
// setTimeout(function () {
//     Fingerprint2.get(function (components: any[]) {
//
//         console.log(components); // an array of components: {key: ..., value: ...}
//
//         const exclude = ["plugins", "adBlock", "canvas"];
//         components = components.filter(el => exclude.indexOf(el.key) === -1);
//         const values = components.map(el => el.value);
//         const murmur = Fingerprint2.x64hash128(values.join(""), 31);
//         document.body.append(murmur);
//         document.body.append(components[0].value);
//         // console.log("finger print", murmur);
//     });
// }, 500);

if ("addEventListener" in document) {
    document.addEventListener(
        "DOMContentLoaded",
        function () {
            FastClick.attach(document.body);
        },
        false,
    );
}
// }
