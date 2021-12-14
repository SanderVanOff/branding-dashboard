import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { database } from "@/plugins/axios";

export default {
  state: {
    token: localStorage.getItem("token") || null,
    user: {},
    uid: localStorage.getItem("uid") || null
  },

  //MUTATIONS
  mutations: {
    setTokenToState(state, { accessToken }) {
      state.token = accessToken;
      localStorage.setItem("token", accessToken);
    },
    setUserToState(state, userData) {
      state.user = userData;
      localStorage.setItem("uid", userData.uid);
    },
    removeUser(state) {
      state.token = null;
      state.user = {};
      localStorage.removeItem("token");
      localStorage.removeItem("uid");
    }
  },

  //ACTIONS
  actions: {
    //Регистрация
    async registerNewUser({ dispatch }, { email, password }) {
      try {
        const auth = getAuth();
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await database.put(`users/${user.uid}.json`, {
          uid: user.uid,
          email,
          login: email.slice(0, email.indexOf("@")),
          role: "user",
          access: 0
        });
        dispatch("notifyUser", {
          type: "success",
          message: "auth/successful-register"
        });
      } catch (error) {
        dispatch("notifyUser", {
          type: "error",
          message: error.code
        });
        throw error;
      }
    },

    //Аутентификация
    async login({ commit, dispatch }, { email, password }) {
      try {
        const auth = getAuth();
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const { data: userData } = await database.get(`users/${user.uid}.json`);

        commit("setTokenToState", user);
        commit("setUserToState", userData);
        dispatch("notifyUser", {
          type: "success",
          message: "auth/successful-login"
        });
      } catch (error) {
        dispatch("notifyUser", {
          type: "error",
          message: error.code
        });
        throw error;
      }
    },

    async logout({ commit, dispatch }) {
      try {
        const auth = getAuth();
        await signOut(auth);
        commit("removeUser");
        commit("clearBrandData");
        dispatch("notifyUser", {
          type: "success",
          message: "auth/successful-exit"
        });
      } catch (error) {
        dispatch("notifyUser", {
          type: "error",
          message: error.code || "Неизвестная ошибка"
        });
      }
    }
  },
  getters: {
    isAuth: (s) => !!s.token,
    currentUser: (s) => s.user,
    currentUID: (s) => s.uid
  }
};
