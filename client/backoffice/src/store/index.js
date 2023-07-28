import { createStore } from 'vuex';
import loginAsUser from './modules/loginAsUser';
import createPersistedState from "vuex-persistedstate";

export default createStore({
  modules: {
      loginAsUser
  },
  plugins: [createPersistedState()]
})
