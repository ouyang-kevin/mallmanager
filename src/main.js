// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import moment from 'moment'
import MyHttpServer from '@/plugin/http.js'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.css'

import router from './router'

Vue.use(ElementUI)
Vue.use(MyHttpServer)
Vue.config.productionTip = false

// 全局过滤器 - 处理日期
Vue.filter('fmtdata', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
