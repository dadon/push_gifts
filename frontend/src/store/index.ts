import Vue from "vue";
import Vuex from "vuex";
import * as admin from "./admin";
import * as user from "./wallet";


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ...admin.Props,
        ...user.Props,
    },
    mutations: {
        ...admin.Mutations,
        ...user.Mutations,
    },
    actions: {
        ...admin.Actions,
        ...user.Actions,
    },
    modules: {},
});
