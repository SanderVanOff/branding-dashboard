import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueEasytable from "vue-easytable";
import "vue-easytable/libs/theme-default/index.css"; // import style
import { initializeApp } from "firebase/app";
import {
  getAuth,
  browserLocalPersistence,
  setPersistence
} from "firebase/auth";

//plugins
import vuetify from "@/plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import VueFormulate from "@braid/vue-formulate";
import { ru } from "@braid/vue-formulate-i18n";
import "@braid/vue-formulate/themes/snow/snow.scss";


//use
Vue.use(VueFormulate, {
  plugins: [ru],
  locale: "ru"
});
Vue.config.productionTip = false;

Vue.use(VueEasytable);
initializeApp({
  apiKey: `${process.env.VUE_APP_API_KEY}`,
  authDomain: `${process.env.VUE_APP_AUTH_DOMAIN}`,
  databaseURL: `${process.env.VUE_APP_DATABASE_URL}`,
  projectId: `${process.env.VUE_APP_PROJECT_ID}`,
  storageBucket: `${process.env.VUE_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.VUE_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.VUE_APP_ID}`,
  measurementId: `${process.env.VUE_APP_MEASUREMENT_ID}`
});

const auth = getAuth();
setPersistence(auth, browserLocalPersistence);
const vm = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
});
vm.$mount("#app");
