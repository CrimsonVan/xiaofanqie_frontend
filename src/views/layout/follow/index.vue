<template>
  <van-nav-bar :fixed="true" title="动态"> </van-nav-bar>
  <div class="safeTop"></div>
  <div class="follow-post" v-for="(item, index) in followPostArr" :key="index">
    <div class="follow-header">
      <img
        class="follow-avatar"
        @click="() => router.push(`/other?username=${item.username}`)"
        :src="item.avatar"
        alt=""
      />
      <span class="follow-nickname">{{ item.nick_name }}</span>
      <van-icon name="ellipsis" />
    </div>
    <img
      @click="() => router.push(`/detail?id=${item.id}`)"
      class="follow-img"
      :src="item.content_img.split(',')[0]"
      alt=""
    />
    <div @click="() => router.push(`/detail?id=${item.id}`)" class="follow-bottom">
      <div class="follow-bottom-icon">
        <van-icon name="like-o" />
        <van-icon name="chat-o" />
        <van-icon name="guide-o" />
        <van-icon name="star-o" />
      </div>
      <div class="follow-bottom-content">{{ item.content }}</div>
      <div class="follow-bottom-date">{{ item.pub_time }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getFollowPostService } from '@/api/post'
import { useNumStore } from '@/stores'
import { useRouter } from 'vue-router'
import type { postAllDataRes, postData } from '@/type/post'
import { throttle } from '@/utils/throttle'
const useStore = useNumStore()
const router = useRouter()
const followPostArr = ref<postData[]>([]) //帖子列表
const pagenum = ref<number>(1) //当前页数
const isDataEnd = ref<boolean>(false) //是否所有数据加载完毕
const isLoading = ref<boolean>(false) //是否在加载数据

// 触底函数
async function onBottom() {
  console.log('正在监听scroll')

  // 获取可视高度
  let clientHeight = document.documentElement.clientHeight
  // console.log('打印高度', clientHeight)

  // 获取滚动高度
  let scrollTop = document.documentElement.scrollTop

  // 滚动条高度
  let scrollHeight = document.documentElement.scrollHeight
  if (clientHeight + scrollTop >= scrollHeight - 170 && !isDataEnd.value && !isLoading.value) {
    pagenum.value++
    isLoading.value = true
    let res: postAllDataRes = await getFollowPostService({
      username: useStore.userInfo.username,
      pagenum: pagenum.value
    })
    isLoading.value = false
    console.log('打印数据长度', res.data.data.length)
    if (res.data.data.length < 5) {
      isDataEnd.value = true
    }
    followPostArr.value = [...followPostArr.value, ...res.data.data]
  }
}
// 将触底函数节流化并用scroll监听完成触发
let throttledScroll = throttle(onBottom, 600)
// window.addEventListener('scroll', throttledScroll)
onMounted(async () => {
  //监听滚动
  document.addEventListener('scroll', throttledScroll)
  //获取帖子
  let res: postAllDataRes = await getFollowPostService({
    username: useStore.userInfo.username,
    pagenum: pagenum.value
  })
  followPostArr.value = res.data.data
})
</script>
<style lang="scss" scoped>
.safeTop {
  width: 100%;

  height: 56px;
}

.follow-post {
  width: 100%;
  //   background-color: palegoldenrod;
  min-height: 300px;
  margin-bottom: 30px;

  .follow-header {
    width: 100%;
    // background-color: salmon;
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    .follow-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 6px;
    }
    .follow-nickname {
      font-size: 12px;
      margin-left: 5px;
      color: black;
      font-weight: 600;
    }
    .van-icon {
      font-size: 16px;
      margin-left: auto;
      margin-right: 8px;
    }
  }
  .follow-img {
    width: 100%;
    height: auto;
    margin-bottom: 4px;
  }
  .follow-bottom {
    width: 100%;
    // background-color: cornsilk;
    .follow-bottom-icon {
      width: 100%;
      //   background-color: skyblue;
      display: flex;
      align-items: center;
      padding: 0 8px;
      .van-icon {
        font-size: 25px;
        margin-left: 12px;
        color: black;
        &:nth-child(1) {
          margin-left: 0;
        }
        &:nth-child(4) {
          margin-left: auto;
        }
      }
    }

    .follow-bottom-content {
      padding: 0 8px;
      font-size: 13px;
      color: black;
      margin-top: 8px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-clamp: 2;
      //   background-color: salmon;
    }
    .follow-bottom-date {
      padding: 0 8px;
      font-size: 12px;
      color: #8a8a8a;
      margin-top: 6px;
      //   background-color: salmon;
    }
  }
}
</style>
