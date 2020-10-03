import "array-from-polyfill";
import "isomorphic-fetch";
import Vue from "vue";
import Fragment from "vue-fragment";
import VueTypedJs from "vue-typed-js";
import { sync } from "vuex-router-sync";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./vuetify";

sync(store, router);

Vue.config.productionTip = false;
Vue.use(Fragment.Plugin);
Vue.use(VueTypedJs);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
