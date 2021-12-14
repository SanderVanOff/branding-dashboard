import Vue from "vue";
import Vuex from "vuex";

//modules
import brands from "./brands";
import general from "./general";
import auth from "./auth";
import user from "./user";
import notify from "./notify";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: [brands, general, auth, user, notify]
});

export default store;
