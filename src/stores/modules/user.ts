import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  userGetInfoService,
  userGetFollowService,
  userAddFollowService,
  userDelFollowService,
  userGetFansService
} from '@/api/user'
import type { followResponseData, userInfoDataAllRes } from '@/type/user'
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
      const res: userInfoDataAllRes = await userGetInfoService({ username })
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
    //搜索历史
    const history = ref<string[]>([])
    const setHistory = (arr: string) => {
      history.value = [...new Set([arr, ...history.value])].slice(0, 14)
    }
    const clearHistory = () => {
      history.value = []
    }
    //关注列表
    const follows = ref<any>([])
    const followsLength = computed(() => follows.value.length)
    const getFollows = async () => {
      const res: followResponseData = await userGetFollowService({
        username: userInfo.value!.username
      })
      follows.value = res.data.data
      console.log('获取关注列表', res.data.data)
    }
    const addFollows = async (obj: any) => {
      const res: any = await userAddFollowService(obj)
      console.log('打印add关注后的res', res)
      await getFollows()
    }

    const delFollows = async ({ username, followUsername }: any) => {
      const res: any = await userDelFollowService({
        username: username,
        followUsername: followUsername
      })
      console.log('打印del关注后的res', res)
      await getFollows()
    }
    //粉丝列表
    const fans = ref<any>([])
    const fansLength = computed(() => fans.value.length)
    const getFans = async () => {
      const res: any = await userGetFansService({
        username: userInfo.value!.username
      })
      fans.value = res.data.data
      console.log('获取粉丝列表', res.data.data)
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
      clearUserInfo,
      history,
      setHistory,
      clearHistory,
      follows,
      followsLength,
      getFollows,
      addFollows,
      delFollows,
      fans,
      fansLength,
      getFans
    }
  },
  {
    persist: true
  }
)
