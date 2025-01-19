import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  userGetInfoService,
  userGetFollowService,
  userAddFollowService,
  userDelFollowService,
  userGetFansService,
  addLikesService,
  delLikesService,
  getLikesService,
  addCommentLikesService,
  delCommentLikesService,
  getCommentLikesService
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
      userInfo.value.follows = res.data.data
    }
    const addFollows = async (obj: any) => {
      await userAddFollowService(obj)
      await getFollows()
    }

    const delFollows = async ({ username, followUsername }: any) => {
      await userDelFollowService({
        username: username,
        followUsername: followUsername
      })
      await getFollows()
    }

    //粉丝列表
    const fans = ref<any>([])
    const fansLength = computed(() => fans.value.length)
    const getFans = async () => {
      const res: any = await userGetFansService({
        username: userInfo.value!.username
      })
      userInfo.value.fans = res.data.data
    }

    //贴文点赞
    const addLikes = async (obj: { username: string; like_id: number }) => {
      await addLikesService(obj)
      const res = await getLikesService({ username: obj.username })
      userInfo.value.likes = res.data.data
    }
    //取消贴文点赞
    const delLikes = async (obj: { username: string; like_id: number }) => {
      await delLikesService(obj)
      const res = await getLikesService({ username: obj.username })
      userInfo.value.likes = res.data.data
    }

    //评论点赞
    const addCommentLikes = async (obj: { username: string; like_comment_id: number }) => {
      await addCommentLikesService(obj)
      const res = await getCommentLikesService({ username: obj.username })
      userInfo.value.comment_likes = res.data.data
    }
    //取消评论点赞
    const delCommentLikes = async (obj: { username: string; like_comment_id: number }) => {
      await delCommentLikesService(obj)
      const res = await getCommentLikesService({ username: obj.username })
      userInfo.value.comment_likes = res.data.data
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
      getFans,
      addLikes,
      delLikes,
      addCommentLikes,
      delCommentLikes
    }
  },
  {
    persist: true
  }
)
