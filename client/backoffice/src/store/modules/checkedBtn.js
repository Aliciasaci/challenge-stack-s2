const state = () => ({
    checkedBtns: []
})

const mutations = {
    setCheckedBtn(state, payload) {
        state.checkedBtns[payload.index] = payload.value;
    },
    initializeCheckedBtns(state, numButtons) {
        state.checkedBtns = new Array(numButtons).fill(false);
    }
}

const actions = {
    initializeCheckedBtns({ commit }, numButtons) {
        commit('initializeCheckedBtns', numButtons);
    }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}