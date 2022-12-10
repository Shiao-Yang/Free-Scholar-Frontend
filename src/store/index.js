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
    address: 'http://139.9.134.209:8000/',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW4iOmZhbHNlLCJleHAiOjE2NzA2ODE2NTZ9.a0l85agpNJToPRElI1EATRq3CF2Pw6EzgTP7stSaWg8",
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
