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
        { path: '/MyLike', component: () => import('../components/screen/MyLike.vue'), name: 'MyLike', },
        { path: '/SmallGame', component: () => import('../components/screen/SmallGame.vue'), name: 'SmallGame', },
        { path: '/StudySite', component: () => import('../components/screen/StudySite.vue'), name: 'Resx.Cf 资源站' },
      ]
    },
    { path: '/404', component: () => import('../components/tips/Error404.vue'), name: '404 (*°∀°)=3' },
    { path: '*', redirect: '/404' }
  ]
})

// 设置afterEach钩子函数改变标题
router.afterEach((to, from, next) => {
  document.title = to.name;
})

export default router
