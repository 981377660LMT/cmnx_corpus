import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './plugins/element.js'
import 'fullpage.js/vendors/scrolloverflow';
import VueFullPage from 'vue-fullpage.js'
import Lodash from 'lodash'
import './assets/css/global.css'
import './assets/css/fullpage.min.css'
import axios from 'axios'
import APlayer from '@moefe/vue-aplayer';
import './axiosConfig'

Vue.prototype.$axios = axios
Vue.prototype.Lodash = Lodash

Vue.use(VueFullPage)
Vue.use(APlayer, {
  defaultCover: '../src/assets/musicJpg_0.jpg', // 设置播放器默认封面图片
  productionTip: false, // 是否在控制台输出版本信息
});

if (process.env.NODE_ENV == 'development') {
  Vue.config.productionTip = false
}
else if (process.env.NODE_ENV == 'production') {
  Vue.config.productionTip = true
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
