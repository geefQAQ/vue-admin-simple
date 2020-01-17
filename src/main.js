import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/permission'

import '@/styles/index.scss' // global css
import '@/styles/font.scss' // 图标字体

import { mockXHR } from '../mock'
mockXHR()

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})