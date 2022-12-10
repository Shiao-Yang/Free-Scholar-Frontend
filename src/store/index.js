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
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW4iOmZhbHNlLCJleHAiOjE2NzA2OTA5OTR9.iDIFfSr49PZ-YZPH3i90HmTsrP2u4pRw_za2cU0hr3Q',
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
