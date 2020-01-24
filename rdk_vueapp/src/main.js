import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import Common from '@/libs/common/common';

Vue.config.productionTip = false

Vue.use(Common);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
