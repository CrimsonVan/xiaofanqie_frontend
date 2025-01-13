<template>
  <!-- <van-button
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
  > -->
  <van-icon class="like_btn" v-if="detailInfo && !isFollow" name="like-o" @click="followHandle" />
  <van-icon
    class="like_btn_active"
    v-if="detailInfo && isFollow"
    name="like"
    color="#ff1e42"
    @click="unfollowHandle"
  />
</template>
<script lang="ts" setup>
import { useNumStore } from '@/stores'
import { ref, onMounted } from 'vue'
const useStore = useNumStore()
const isFollow = ref<boolean>(false) //是否被关注
let props = defineProps({
  detailInfo: {
    type: Object
  }
})
//判断是否已经关注
const isFollowed = () => {
  let index = useStore.userInfo.likes.findIndex(
    (item: any) => item.like_id === props?.detailInfo?.id
  )
  if (index === -1) {
    isFollow.value = false
  } else {
    isFollow.value = true
  }
}
//关注操作
const followHandle = async () => {
  isFollow.value = true
  await useStore.addLikes({
    username: useStore.userInfo.username,
    like_id: props?.detailInfo?.id
  })
}
//取消关注操作
const unfollowHandle = async () => {
  isFollow.value = false
  await useStore.delLikes({
    username: useStore.userInfo.username,
    like_id: props?.detailInfo?.id
  })
}

onMounted(() => {
  isFollowed()
})
</script>
<style lang="scss" scoped>
.like_btn {
  font-size: 26px;
}
.like_btn_active {
  font-size: 26px;
}
</style>
