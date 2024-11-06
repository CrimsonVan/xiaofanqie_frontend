<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useCountStore } from './stores/modules/count'
import './utils/connectSocket'
console.log(111)
const countStore = useCountStore()
const changeColor = () => {
  countStore.changeNum()
}
changeColor()
console.log('测试app.vue')
</script>
<template>
  <RouterView></RouterView>
</template>
