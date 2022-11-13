import Vue from 'vue'
import App from './App.vue'
import store from '@/_store';
import router from './router'
import vuesax from 'vuesax'

import 'boxicons/css/boxicons.min.css'

import 'vuesax/dist/vuesax.css'
import filters from "@/_plugins/filters"; //Vuesax styles
Vue.use(vuesax, {
  // options here
})
Vue.config.productionTip = false

Vue.use(filters);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
