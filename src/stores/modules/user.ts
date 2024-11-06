import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userGetInfoService } from '@/api/user'

export const useNumStore = defineStore(
  'num',
  () => {
    //身份信息
    const userInfo = ref()
    const token = ref()
    const setToken = (t: string) => {
      token.value = t
    }
    console.log('pinia')

    const clearToken = () => {
      token.value = null
    }
    const getUserInfo = async (username: string) => {
      const res = await userGetInfoService({ username })
      userInfo.value = res.data.data
    }
    const clearUserInfo = () => {
      userInfo.value = null
    }
    //主题颜色
    const curTheme = ref('#55c9c9')
    const isDark = ref(false)
    const num = ref(9)
    const changeNum = () => {
      num.value++
    }
    return {
      num,
      changeNum,
      clearToken,
      token,
      setToken,
      userInfo,
      curTheme,
      isDark,
      getUserInfo,
      clearUserInfo
    }
  },
  {
    persist: true
  }
)
