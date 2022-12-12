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
    baseInfo: [],
    address: 'http://139.9.134.209:8000/',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW4iOmZhbHNlLCJleHAiOjE2NzA2OTkzMjR9.o3dbl9a1UGU2JOz_v7WOpQ_EuO-TJY5QN6LT0NQu_QU',
    url: 'http://139.9.134.209:8000/media/avatars/',
    input: '',
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
