// Vue 应用的入口
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import 'fullpage.js/vendors/scrolloverflow';
import VueFullPage from 'vue-fullpage.js'
import Lodash from 'lodash'



//导入全局样式表
import './assets/css/global.css'
import './assets/css/fullpage.min.css'
// 导入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//导入axios支持ajax请求
import axios from 'axios'
Vue.prototype.$http = axios    //将$http属性挂载到Vue原型上，每个Vue对象都能this.$http访问axios
Vue.prototype.Lodash = Lodash


Vue.use(VueFullPage)
import TreeTable from 'vue-table-with-tree-grid'
//注册为全局组件
Vue.component('tree-table', TreeTable)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
