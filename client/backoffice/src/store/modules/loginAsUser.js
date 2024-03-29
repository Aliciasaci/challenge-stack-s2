import router from "@/router";

const state = () => ({
  currentUser: null,
  isLoggedInAsAdmin: false,
});

const mutations = {
  setCurrentUser(state, user) {
    state.currentUser = user;
  },
  clearCurrentUser(state) {
    state.currentUser = null;
  },
};

const actions = {
  loginAsUser({ commit }, user) {
    const admin = JSON.parse(localStorage.getItem("user"));
    if (admin.role === "USER_ADMIN") {
      commit("setCurrentUser", user);
      router.push({ name: "clientpanel" });
    }
  },
  logoutAsUser({ commit }) {
    commit("clearCurrentUser");
    localStorage.removeItem("vuex");
    router.push({ name: "usercrud" });
  },
};

const getters = {
  isLoggedInAsUser(state) {
    return !!state.currentUser;
  },
  currentUser(state) {
    return state.currentUser;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
