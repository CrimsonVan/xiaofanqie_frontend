<template>
  <van-button
    v-if="useStore.userInfo.username !== detailInfo?.username && detailInfo && !isFollow"
    :class="[isOther ? 'nav-btn-other' : 'nav-btn']"
    plain
    @click="followHandle"
    >关注</van-button
  >
  <van-button
    v-if="useStore.userInfo.username !== detailInfo?.username && detailInfo && isFollow"
    :class="[isOther ? 'nav-btn-other-followed' : 'nav-btn-followed']"
    plain
    @click="unfollowHandle"
    >已关注</van-button
  >
</template>
<script lang="ts" setup>
import { useNumStore } from '@/stores'
import { ref, watch } from 'vue'
const useStore = useNumStore()
const isFollow = ref<boolean>(false) //是否被关注
let props = defineProps({
  detailInfo: {
    type: Object
  },
  isOther: {
    type: Boolean,
    default: false
  }
})
//判断是否已经关注
const isFollowed = () => {
  let index = useStore.follows.findIndex(
    (item: any) => item.followUsername === props?.detailInfo?.username
  )
  console.log('打印index', index)

  if (index === -1) {
    isFollow.value = false
  } else {
    isFollow.value = true
  }
}
//关注操作
const followHandle = async () => {
  isFollow.value = true
  await useStore.addFollows({
    username: useStore.userInfo.username,
    followUsername: props?.detailInfo?.username,
    followNickname: props?.detailInfo?.nick_name,
    followAvatar: props?.detailInfo?.avatar
  })
}
//取消关注操作
const unfollowHandle = async () => {
  isFollow.value = false
  await useStore.delFollows({
    username: useStore.userInfo.username,
    followUsername: props?.detailInfo?.username
  })
}

watch(
  () => props.detailInfo,
  (newVal) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    newVal && isFollowed()
  },
  {
    deep: true,
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
.nav-btn {
  border-radius: 12px;
  height: 24px;
  min-width: 52px;
  margin-right: 8px;
  font-size: 12px;
  padding: 3px;
  color: var(--theme-color);
  border-color: var(--theme-color);
}
.nav-btn-other {
  border-radius: 12px;
  height: 25px;
  min-width: 52px;
  margin-right: 8px;
  font-size: 12px;
  padding: 4px 10px;
  color: #ffffff;
  border-color: var(--theme-color);
  background-color: var(--theme-color);
}
.nav-btn-followed {
  border-radius: 12px;
  height: 24px;
  min-width: 52px;

  margin-right: 8px;
  font-size: 12px;
  padding: 3px;
  color: #333333;
  border-color: #ccc;
}
.nav-btn-other-followed {
  border-radius: 12px;
  height: 25px;
  min-width: 52px;
  margin-right: 8px;
  font-size: 12px;
  padding: 4px 10px;
  color: #ffffff;
  border-color: #ffffff;
  background-color: transparent;
}
</style>
