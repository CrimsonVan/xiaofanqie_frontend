<template>
  <RouterView></RouterView>
  <div class="safeBottom"></div>
  <van-tabbar route v-model="active">
    <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/follow" icon="play-circle-o">动态</van-tabbar-item>
    <van-tabbar-item to="/publish" name="search">
      <template #icon="">
        <van-button class="plus" icon="plus" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/msg" icon="friends-o">消息</van-tabbar-item>
    <van-tabbar-item to="/myself" icon="setting-o">我</van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import socket from '../../utils/connectSocket'
import { useNumStore } from '@/stores'
const userStore = useNumStore()
socket.emit('join', userStore.userInfo.username)
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
  background-color: #ffffff;
  height: 50px;
}

.plus {
  width: 42px;
  height: 34px;
  padding: 0;
  font-size: 18px;
  border-radius: 8px;
  color: #ffffff;
  border-color: var(--theme-color);
  background-color: var(--theme-color);
}
</style>
