import axios from 'axios'
import router from '../router/index'
import { useNumStore } from '@/stores'
import { baseURL } from './config'
import { showLoadingToast, closeToast, showNotify, showFailToast } from 'vant'
console.log(showFailToast)

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    showLoadingToast({
      duration: 0, // 持续展示 toast
      message: '加载中...',
      forbidClick: true
    })
    const useStore = useNumStore()
    if (useStore.token) {
      config.headers.Authorization = useStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res: any) => {
    closeToast()
    // TODO 4. 摘取核心响应数据
    if (res.data.code === 0) {
      return res
    }
    // 错误的特殊情况 => 401 权限不足 或 token 过期 => 拦截到登录

    if (res.data.status === 401) {
      showNotify({ type: 'danger', message: res.data.message || '服务异常' })
      return router.push('/login')
    }
    // TODO 3. 处理业务失败
    // 处理业务失败, 给错误提示，抛出错误
    showNotify({ type: 'danger', message: res.data.message || '服务异常' })
    // showFailToast(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },

  (err) => {
    closeToast()
    // TODO 5. 处理401错误
    // 错误的特殊情况 => 401 权限不足 或 token 过期 => 拦截到登录
    if (err.response?.status === 401) {
      router.push('/login')
    }

    // 错误的默认情况 => 只要给提示
    showNotify({ type: 'danger', message: err.response.data.message || '服务异常' })
    return Promise.reject(err)
  }
)

export default instance
// export { baseURL }
