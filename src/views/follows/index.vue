<template>
  <van-nav-bar title="关注列表" :fixed="true">
    <template #left>
      <van-icon name="arrow-left" @click="goback" />
    </template>
  </van-nav-bar>
  <div class="safeTop"></div>
  <div class="follow-item" v-for="(item, index) in followArr" :key="index">
    <img @click="goDetail(item.followUsername)" class="avatar" :src="item.followAvatar" alt="" />
    <div class="info">{{ item.followNickname }}</div>
    <followButton
      :detailInfo="{
        username: item.followUsername,
        nick_name: item.followNickname,
        avatar: item.followAvatar
      }"
    ></followButton>
    <van-icon name="ellipsis" />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useNumStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router'
import { deepClone1 } from '@/utils/deepClone'
import followButton from '@/components/followButton.vue'
import { userGetFollowService } from '@/api/user'
const useStore = useNumStore()
const router = useRouter()
const route = useRoute()
const followArr = ref<any>([])
const goback = () => {
  router.back()
}

const goDetail = (username: string) => {
  if (username === useStore.userInfo.username) {
    router.push(`/myself`)
  } else {
    router.push(`/other?username=${username}`)
  }
}
onMounted(async () => {
  if (route.query.type === 'myself') {
    followArr.value = deepClone1(useStore.userInfo.follows)
  } else {
    let res = await userGetFollowService({ username: route.query.username as string })
    console.log('打印other的关注列表', res.data.data)
    followArr.value = res.data.data
  }
})
</script>
<style lang="scss" scoped>
::v-deep(.van-nav-bar__left) {
  //   background-color: saddlebrown;
  padding: 0 2px;
  font-size: 20px;
}
.safeTop {
  width: 100%;
  background-color: #ffffff;
  height: 46px;
}
.follow-item {
  margin-top: 20px;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  display: flex;
  // background-color: palegoldenrod;
  align-items: center;
  .avatar {
    width: 38px;
    height: 38px;
    overflow: hidden;
    border-radius: 50%;
  }
  .info {
    // background-color: salmon;
    color: black;
    margin-left: 8px;
    margin-right: auto;
  }

  .van-icon-ellipsis {
    font-size: 20px;
  }
}
</style>
