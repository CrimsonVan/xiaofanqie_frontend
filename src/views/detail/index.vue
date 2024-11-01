<template>
  <van-nav-bar :fixed="true" @click-left="onClickLeft">
    <template #left>
      <van-icon name="arrow-left" />
      <img class="nav-avatar" :src="detailInfo.url" alt="" />
      <span class="nav-name">小猫吃鱼</span>
    </template>
    <template #right>
      <van-button class="nav-btn" plain type="danger">关注</van-button>
      <van-icon name="share-o" />
    </template>
  </van-nav-bar>
  <div class="safeBottom"></div>
  <van-swipe :autoplay="3000" indicator-color="#ff6430">
    <van-swipe-item v-for="item in 4" :key="item">
      <img style="width: 100%" :src="detailInfo.url"
    /></van-swipe-item>
  </van-swipe>
  <div style="width: 100%; height: 70vh; background-color: #ffffff"></div>
  <div class="safeBottom"></div>
  <van-action-bar>
    <van-action-bar-icon icon="chat-o" text="客服" @click="onClickIcon" />
    <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickIcon" />
    <van-action-bar-icon icon="shop-o" text="店铺" @click="onClickIcon" />
    <van-action-bar-button type="danger" text="立即购买" @click="onClickButton" />
  </van-action-bar>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const detailInfo = ref<any>({
  url: ''
})
const onClickLeft = () => {
  router.push('/home')
}
onMounted(() => {
  console.log('测试query', route.query.picurl)
  detailInfo.value.url = route.query.picurl
})
const onClickIcon = () => console.log('点击图标')
const onClickButton = () => console.log('点击按钮')
</script>
<style lang="scss" scoped>
.safeBottom {
  width: 100%;
  background-color: #f5f5f5;
  height: 46px;
}
::v-deep(.van-nav-bar__left) {
  //   background-color: saddlebrown;
  padding: 0 8px;
  font-size: 20px;
  //   .van-icon {
  //     color: #333333;
  //   }
}
::v-deep(.van-nav-bar__right) {
  //   background-color: saddlebrown;
  padding: 0 8px;
  font-size: 20px;
}
.nav-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 6px;
}
.nav-name {
  margin-left: 5px;
  font-size: 12px;
  color: #333333;
}
.nav-btn {
  border-radius: 14px;
  height: 56%;
  margin-right: 8px;
}
.van-swipe {
  width: 100%;
  overflow: hidden;
  .van-swipe-item {
    height: 100%;
    width: 100%;
  }
  .van-swipe__indicator {
    background-color: #6e6e6e;
  }
}
.van-safe-area-bottom {
  border-top: 1px solid #ccc;
}
</style>
