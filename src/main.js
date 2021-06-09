import Vue from 'vue'
import axios from 'axios'
import APlayer from '@moefe/vue-aplayer'
import 'fullpage.js/vendors/scrolloverflow'
import VueFullPage from 'vue-fullpage.js'

import App from './App.vue'
import store from './store'
import router from './router'
import './plugins/element.js'
import './axiosConfig'

import './assets/css/fullpage.min.css'
import './assets/css/global.css'

Vue.prototype.$axios = axios

Vue.use(VueFullPage)
Vue.use(APlayer, {
  defaultCover: '../src/assets/musicJpg_0.jpg', // 设置播放器默认封面图片
  productionTip: false, // 是否在控制台输出版本信息
})

Vue.config.productionTip = true

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
