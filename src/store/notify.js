function generationId() {
  let id = 0;
  return function append() {
    return id++;
  };
}

const notifyID = generationId();

export default {
  state: {
    notify: []
  },
  mutations: {
    setNotify(state, notify) {
      state.notify.push(notify);
    },
    removeNotify(state) {
      state.notify.pop();
    }
  },
  actions: {
    notifyUser({ commit }, notify) {
      const id = notifyID();
      commit("setNotify", { id, ...notify });
      setTimeout(() => {
        commit("removeNotify", { id, ...notify });
      }, 5000);
    }
  },
  getters: {
    notify: (s) => s.notify
  }
};
