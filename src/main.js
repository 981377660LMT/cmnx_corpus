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
  defaultCover: 'https://github.com/u3u.png', // 设置播放器默认封面图片
  productionTip: false, // 是否在控制台输出版本信息
});


Vue.config.productionTip = false



new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
