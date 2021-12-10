import Auth from '../auth'

const id = localStorage.getItem('userId');

const state = {
  status: {
    loggedIn: true
  },
  userId: id,
  userRole: localStorage.getItem('userRole')
}

const defaultState = {
  status: {
    loggedIn: false
  },
  userId: null,
  userRole: null
}

const initialState = id ? state : defaultState

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, {
      login,
      password
    }) {
      return Auth.login(login, password).then(
        data => {
          commit('loginSuccess', {id: data.id, role: data.role})
          return Promise.resolve({id: data.id, role: data.role})
        },
        error => {
          commit('loginFailure')
          return Promise.reject(error)
        }
      )
    },
    logout({ commit }) {
      Auth.logout()
      commit('logout')
    },
    register({ commit }, {
      login,
      password
    }) {
      return Auth.register(login, password).then(
        data => {
          commit('loginSuccess', {id: data.id, role: data.role})
          return Promise.resolve({id: data.id, role: data.role})
        },
        error => {
          commit('loginFailure')
          return Promise.reject(error)
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, {id, role}) {
      state.status.loggedIn = true
      state.userId = id
      state.userRole = role
    },
    loginFailure(state) {
      state.status.loggedIn = false
      state.userId = null
      state.userRole = null
    },
    logout(state) {
      state.status.loggedIn = false
      state.userId = null
      state.userRole = null
    }
  }
};