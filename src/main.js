import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";

import LoadMore from "@/directives/loadmore.js";
Vue.use(LoadMore);

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
}).$mount("#app");
