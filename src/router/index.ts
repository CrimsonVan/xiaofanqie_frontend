import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '../views/layout/index.vue'
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  //路由模式hash
  history: createWebHashHistory('/tsredbook/'),
  routes: [
    {
      //登录成功以后展示数据的路由
      path: '/',
      component: layout,
      name: 'layout',
      redirect: '/home',
      children: [
        { path: '/home', component: () => import('../views/layout/home/index.vue') },
        { path: '/msg', component: () => import('../views/layout/msg/index.vue') },
        { path: '/myself', component: () => import('../views/layout/myself/index.vue') }

        // {
        //   path: "/myself",
        //   component: () => import("../views/layout/myself.vue"),
        // },
        // {
        //   path: "/social",
        //   component: () => import("../views/layout/social.vue"),
        // },
      ]
    },
    {
      path: '/login',
      component: () => import('../views/login/index.vue'),
      name: 'login'
    },
    { path: '/chat', component: () => import('../views/chat/index.vue'), name: 'chat' },
    {
      path: '/detail',
      component: () => import('../views/detail/index.vue'),
      name: 'detail'
    }
  ]
})

export default router
