import { createStore } from 'vuex';

export default createStore({
  state: {
    checkedBtns: [],
  },
  mutations: {
    setCheckedBtn(state, payload) {
      state.checkedBtns[payload.index] = payload.value;
    },
    initializeCheckedBtns(state, numButtons) {
      state.checkedBtns = new Array(numButtons).fill(false);
    },
  },
  actions: {
    initializeCheckedBtns({ commit }, numButtons) {
      commit('initializeCheckedBtns', numButtons);
    },
  },
  modules: {},
});
