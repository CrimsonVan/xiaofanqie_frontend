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
        {
          path: '/home',
          component: () => import('../views/layout/home/index.vue'),
          meta: {
            keepAlive: false //设置页面是否需要使用缓存
          }
        },
        {
          path: '/msg',
          component: () => import('../views/layout/msg/index.vue'),
          meta: {
            keepAlive: false //设置页面是否需要使用缓存
          }
        },
        {
          path: '/myself',
          component: () => import('../views/layout/myself/index.vue'),
          meta: {
            keepAlive: false //设置页面是否需要使用缓存
          }
        },
        {
          path: '/follow',
          component: () => import('../views/layout/follow/index.vue'),
          meta: {
            keepAlive: false //设置页面是否需要使用缓存
          }
        }
      ],
      meta: {
        keepAlive: false //设置页面是否需要使用缓存
      }
    },
    {
      path: '/login',
      component: () => import('../views/login/index.vue'),
      name: 'login',
      meta: {
        keepAlive: false //设置页面是否需要使用缓存
      }
    },
    {
      path: '/follows',
      component: () => import('../views/follows/index.vue'),
      name: 'follows',
      meta: {
        keepAlive: false //设置页面是否需要使用缓存
      }
    },
    {
      path: '/fans',
      component: () => import('../views/fans/index.vue'),
      name: 'fans',
      meta: {
        keepAlive: false //设置页面是否需要使用缓存
      }
    },
    {
      path: '/search',
      component: () => import('../views/search/index.vue'),
      name: 'Search',
      meta: {
        keepAlive: true //设置页面是否需要使用缓存
      }
    },
    {
      path: '/profile',
      component: () => import('../views/profile/index.vue'),
      name: 'profile',
      meta: {
        keepAlive: false //设置页面是否需要使用缓存
      }
    },
    {
      path: '/publish',
      component: () => import('../views/publish/index.vue'),
      name: 'publish',
      meta: {
        keepAlive: false //设置页面是否需要使用缓存
      }
    },
    {
      path: '/other',
      component: () => import('../views/otherhome/index.vue'),
      name: 'other',
      meta: {
        keepAlive: false //设置页面是否需要使用缓存
      }
    },
    {
      path: '/chat',
      component: () => import('../views/chat/index.vue'),
      name: 'chat',
      meta: {
        keepAlive: false //设置页面是否需要使用缓存
      }
    },
    {
      path: '/detail',
      component: () => import('../views/detail/index.vue'),
      name: 'Detail',
      meta: {
        keepAlive: false //设置页面是否需要使用缓存
      }
    }
  ]
})
router.beforeEach((to) => {
  // 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行
  const useStore = useNumStore()
  if (!useStore.token && to.path !== '/login' && to.path !== '/home' && to.path !== '/search')
    return '/login'
})
export default router
