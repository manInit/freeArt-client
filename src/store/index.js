import { createStore } from 'vuex'
import { auth } from './auth.module'

const store = createStore({
  modules: {
    auth
  },
  getters: {
    isAuth: state => {
      return state.auth.status.loggedIn
    },
    idUser: state => {
      return state.auth.userId
    },
    roleUser: state => {
      return state.auth.userRole
    },
  },
})

export default store
