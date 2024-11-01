<template>
  <van-nav-bar :fixed="true" title="发现">
    <template #left>
      <van-icon name="wap-nav" size="18" />
    </template>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <div class="safeTop"></div>
  <RouterView></RouterView>
  <div class="safeBottom"></div>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="search">视频</van-tabbar-item>
    <van-tabbar-item name="search">
      <template #icon="props">
        <img style="height: 100%; width: 50px" :src="props.active ? icon.active : icon.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="friends-o">消息</van-tabbar-item>
    <van-tabbar-item icon="setting-o">我</van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
const icon = ref({
  active: 'https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png',
  inactive: 'https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png'
})
const active = ref('home')
</script>
<style lang="scss" scoped>
.safeTop {
  width: 100%;
  background-color: #f5f5f5;
  height: 46px;
}
.safeBottom {
  width: 100%;
  background-color: #f5f5f5;
  height: 50px;
}
</style>
