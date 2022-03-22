import { createStore } from 'vuex'

export default createStore({
  state: {
    currentUser: null,
    isLoggedIn: false
  },
  getters: {
  },
  mutations: {
    login(state, payload) {
      console.log('payload ', payload)
      state.isLoggedIn = true
      state.currentUser = payload.user
    },
    logout(state) {
      state.isLoggedIn = false
    }
  },
  actions: {
  },
  modules: {
  }
})
