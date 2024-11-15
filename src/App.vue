<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useCountStore } from './stores/modules/count'
import './utils/connectSocket'
import './assets/base.css'
console.log(111)
const countStore = useCountStore()
const changeColor = () => {
  countStore.changeNum()
}
changeColor()
console.log('测试app.vue')
</script>
<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.path" />
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.path" />
  </router-view>

  <!-- <RouterView></RouterView> -->
</template>
