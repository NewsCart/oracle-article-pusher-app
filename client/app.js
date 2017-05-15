import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import VeeValidate from 'vee-validate'
import VueSweetAlert from 'vue-sweetalert'
import App from './components/App'
import router from './router'
import store from './store'
import './style.css'

Vue.use(VeeValidate)
Vue.use(VueSweetAlert)

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
