import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      uid: 1,
      username: "",
      email: "",
      profile: "I'm Peter",
    },
    address: 'http://139.9.134.209:8000/'
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
