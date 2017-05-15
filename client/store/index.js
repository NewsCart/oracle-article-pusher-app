import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    receiveUser (state, user) {
      state.user = user
    },
    signOut (state) {
      state.user = null
    }
  },
  actions: {
    receiveUser ({ commit }, user) {
      commit('receiveUser', user)
    }
  }
})

export default store
