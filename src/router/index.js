import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Error404 from '../components/Error404.vue'


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      component: Home,
      // children: [
      //   {}
      // ]
    },
    { path: '/404', component: Error404 },
    { path: '*', redirect: '/404' }
  ]
})

// //挂载路由导航守卫
// router.beforeEach((to, from, next) => {//to:将要访问的路径；from:从哪个路径来；next:放行
//   if (to.path == '/login') return next()
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router
