import { createStore, createLogger } from 'vuex'
import checkedBtn from './modules/checkedBtn'
import loginAsUser from './modules/loginAsUser'

export default createStore({
  modules: {
      checkedBtn,
      loginAsUser
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
