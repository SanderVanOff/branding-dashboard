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
  apiKey: "AIzaSyDSMCuARRsfagl5_QaKCEvpDAW-BHJ4vHY",
  authDomain: "ads-on-cars-e195e.firebaseapp.com",
  databaseURL: "https://ads-on-cars-e195e-default-rtdb.firebaseio.com",
  projectId: "ads-on-cars-e195e",
  storageBucket: "ads-on-cars-e195e.appspot.com",
  messagingSenderId: "797844828666",
  appId: "1:797844828666:web:2f366fa23ff35d5f49f443",
  measurementId: "G-3XH1JWYT8N"
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
