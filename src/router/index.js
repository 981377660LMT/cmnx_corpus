import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      name: 'CMNX_CORPUS',
      // meta: { index: 0 },
      component: () => import('../components/Home.vue'),
      children: [
        { path: '/Ctm49Site', component: () => import('../components/screen/Ctm49Site.vue'), name: "Yitx's Blog" },
        { path: '/Music', component: () => import('../components/screen/Music.vue'), name: 'CMNX_CORPUS', },
        { path: '/MyLike', component: () => import('../components/screen/MyLike.vue'), name: 'CMNX_CORPUS', },
        { path: '/SmallGame', component: () => import('../components/screen/SmallGame.vue'), name: 'CMNX_CORPUS', },
        { path: '/StudySite', component: () => import('../components/screen/StudySite.vue'), name: 'Resx.Cf 资源站' },
      ]
    },
    { path: '/404', component: () => import('../components/Error404.vue'), name: '404 (*°∀°)=3' },
    { path: '*', redirect: '/404' }
  ]
})

// //挂载路由导航守卫
// router.beforeEach((to, from, next) => {//to:将要访问的路径；from:从哪个路径来；next:放行
//   if (to.path == '/Mylike') return next()
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/home')
//   next()
// })


// 设置afterEach钩子函数改变标题
router.afterEach((to, from, next) => {
  document.title = to.name;
  next();
})

export default router
