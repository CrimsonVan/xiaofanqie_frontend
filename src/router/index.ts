import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '../views/layout/index.vue'
import { useNumStore } from '@/stores'
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
      ]
    },
    {
      path: '/login',
      component: () => import('../views/login/index.vue'),
      name: 'login'
    },
    {
      path: '/other',
      component: () => import('../views/otherhome/index.vue'),
      name: 'other'
    },
    { path: '/chat', component: () => import('../views/chat/index.vue'), name: 'chat' },
    {
      path: '/detail',
      component: () => import('../views/detail/index.vue'),
      name: 'detail'
    }
  ]
})
router.beforeEach((to) => {
  // 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行
  const useStore = useNumStore()
  if (!useStore.token && to.path !== '/login') return '/login'
})
export default router
