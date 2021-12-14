import { database } from "@/plugins/axios";

export default {
  state: {
    userList: []
  },

  //MUTATIONS
  mutations: {
    setUserListToState(state, userList) {
      state.userList = userList;
    },
    updateUserDataInState(state, updateUserData) {
      state.userList = state.userList.map((item) => {
        if (item.uid === updateUserData.uid) {
          item = updateUserData;
          return item;
        } else {
          return item;
        }
      });
    }
  },

  //ACTIONS
  actions: {
    async getUserList({ commit }) {
      const { data } = await database.get(`users.json`);
      const userList = [];
      Object.keys(data).forEach((key) => {
        userList.push({
          ...data[key],
          access: !data[key].access ? [] : data[key].access
        });
      });
      commit("setUserListToState", userList);
    },
    //ПОЛУЧЕНИЕ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ
    async getCurrentUser({ commit, getters }) {
      const uid = await getters.currentUID;
      if (uid) {
        const { data: userData } = await database.get(`users/${uid}.json`);
        userData.access = !userData.access ? [] : userData.access;
        commit("setUserToState", userData);
      }
    },

    //ОБНОВЛЕНИЕ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
    async updateUserData({ commit }, updateUserData) {
      try {
        await database.patch(
          `users/${updateUserData.uid}.json`,
          updateUserData
        );
        commit("updateUserDataInState", updateUserData);
      } catch (e) {
        console.log(e);
      }
    }
  },
  getters: {
    userList: (s) => s.userList,
    availableCountries: (s, getters) =>
      Array.from(
        new Set(getters.currentUser.access.map((item) => item.country))
      ),

    availableCities: (s, getters) =>
      Array.from(new Set(getters.currentUser.access.map((item) => item.id)))
  }
};
