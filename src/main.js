import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'


Vue.use(ElementUI);
Vue.prototype.$axios = axios


Vue.config.productionTip = false
axios.defaults.baseURL = 'http://123.12.123.12:8000';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
