import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import toasted from "vue-toasted";

Vue.use(toasted, {
  duration: 10000,
  position: "top-right",
  action: {
    text: "Close",
    onClick: (e, toastObject) => {
      toastObject.goAway(0);
    },
  },
});

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
