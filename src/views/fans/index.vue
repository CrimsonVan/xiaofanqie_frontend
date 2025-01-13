<template>
  <van-nav-bar title="粉丝列表" :fixed="true">
    <template #left>
      <van-icon name="arrow-left" @click="goback" />
    </template>
  </van-nav-bar>
  <div class="safeTop"></div>
  <div class="follow-item" v-for="(item, index) in fansArr" :key="index">
    <img @click="goDetail(item.username)" class="avatar" :src="item.fansAvatar" alt="" />
    <div class="info">{{ item.fansNickname }}</div>
    <followButton
      :detailInfo="{
        username: item.username,
        nick_name: item.fansNickname,
        avatar: item.fansAvatar
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
import { userGetFansService } from '@/api/user'
const useStore = useNumStore()
const router = useRouter()
const route = useRoute()
const fansArr = ref<any>([])
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
    fansArr.value = deepClone1(useStore.userInfo.fans)
  } else {
    let res = await userGetFansService({ username: route.query.username as string })
    console.log('打印other的粉丝列表', res.data.data)
    fansArr.value = res.data.data
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
