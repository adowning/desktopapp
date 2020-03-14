console.log(process.env)
// const { ipcRenderer } = require('electron')
// const updateOnlineStatus = () => {
//   ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline')
// }

// window.addEventListener('online', updateOnlineStatus)
// window.addEventListener('offline', updateOnlineStatus)

import Vue from 'vue'
import './plugins/new-parse'

// const parseApi = new ParseApi(store, device)
import store from './newstore'
import { router } from './router'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '@/util/register-service-worker'
import '@/util/handle-network-status'
// import ParseApi from '@/api/parseApi'

Vue.prototype.$eventHub = new Vue() // global event bus

import VueMoment from 'vue-moment'
Vue.use(VueMoment)

import VueElectron from 'vue-electron'
Vue.use(VueElectron)

console.log('start')
Vue.config.productionTip = false
Vue.prototype.$updateBus = new Vue()
global.updateBus = Vue.prototype.$updateBus

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
