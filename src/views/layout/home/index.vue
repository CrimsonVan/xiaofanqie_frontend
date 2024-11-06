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
  <Waterfall
    :delay="5"
    :posDuration="10"
    :animationDelay="5"
    :animationDuration="5"
    :gutter="4"
    :list="waterfallList"
    :breakpoints="breakpoints"
  >
    <template #default="{ item }">
      <div @click="godetail(item.id)" class="card">
        <img class="card-img" :src="item.content_img" alt="" />
        <div class="card-text">
          <div class="card-text-top">{{ item.content }}</div>
          <div class="card-text-bottom">
            <img class="card-text-bottom-img" :src="item.avatar" alt="" />
            <span class="card-text-bottom-name">{{ item.nick_name }}</span>
            <span class="card-text-bottom-like">2791</span>
          </div>
        </div>
      </div>
    </template>
  </Waterfall>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import 'vue-waterfall-plugin-next/dist/style.css'
import { Waterfall } from 'vue-waterfall-plugin-next'
import { useRouter } from 'vue-router'
import { throttle } from '@/utils/throttle'
import { getPostService } from '@/api/post'
const router = useRouter()
const loading = ref(true)

const waterfallList = ref([
  {
    avatar: 'https://mp-e8bb14f6-55c1-481a-9c68-bae5900cd604.cdn.bspapp.com/3454458504.jpg',
    comments_length: 99,
    content:
      '我们的颜色选择器工具是一个强大的在线工具，允许您从任何图像中选择颜色。选择图像后，您可以使用放大镜放大并选择单个像素，以实时预览其颜色。 我们的工具使用户能够从图像...',
    content_img: 'https://mp-e8bb14f6-55c1-481a-9c68-bae5900cd604.cdn.bspapp.com/3454493537.jpg',
    id: 0,
    nick_name: '小美',
    pub_time: '10-29',
    title: '人在极端无语真的会被气笑',
    username: '13114209345'
  },
  {
    avatar: 'https://mp-e8bb14f6-55c1-481a-9c68-bae5900cd604.cdn.bspapp.com/avatar/害羞超人.png',
    comments_length: 99,
    content:
      '我们的颜色选择器工具是一个强大的在线工具，允许您从任何图像中选择颜色。选择图像后，您可以使用放大镜放大并选择单个像素，以实时预览其颜色。 我们的工具使用户能够从图像...',
    content_img:
      'https://mp-e8bb14f6-55c1-481a-9c68-bae5900cd604.cdn.bspapp.com/avatar/害羞超人.png',
    id: 0,
    nick_name: '小美',
    pub_time: '10-29',
    title: '人在极端无语真的会被气笑',
    username: '13114209345'
  }
])
const testList = ref([
  {
    avatar: 'https://mp-e8bb14f6-55c1-481a-9c68-bae5900cd604.cdn.bspapp.com/avatar/害羞超人.png',
    comments_length: 99,
    content:
      '我们的颜色选择器工具是一个强大的在线工具，允许您从任何图像中选择颜色。选择图像后，您可以使用放大镜放大并选择单个像素，以实时预览其颜色。 我们的工具使用户能够从图像...',
    content_img:
      'https://mp-e8bb14f6-55c1-481a-9c68-bae5900cd604.cdn.bspapp.com/avatar/害羞超人.png',
    id: 0,
    nick_name: '小美',
    pub_time: '10-29',
    title: '人在极端无语真的会被气笑',
    username: '13114209345'
  },
  {
    avatar: 'https://mp-e8bb14f6-55c1-481a-9c68-bae5900cd604.cdn.bspapp.com/avatar/害羞超人.png',
    comments_length: 99,
    content:
      '我们的颜色选择器工具是一个强大的在线工具，允许您从任何图像中选择颜色。选择图像后，您可以使用放大镜放大并选择单个像素，以实时预览其颜色。 我们的工具使用户能够从图像...',
    content_img:
      'https://mp-e8bb14f6-55c1-481a-9c68-bae5900cd604.cdn.bspapp.com/avatar/害羞超人.png',
    id: 0,
    nick_name: '小美',
    pub_time: '10-29',
    title: '人在极端无语真的会被气笑',
    username: '13114209345'
  }
])
const breakpoints = ref({
  3000: {
    //当屏幕宽度小于等于3000
    rowPerView: 6 // 一行8图
  },
  1800: {
    //当屏幕宽度小于等于1800
    rowPerView: 4 // 一行6图
  },
  800: {
    //当屏幕宽度小于等于1200
    rowPerView: 3
  },

  500: {
    //当屏幕宽度小于等于500
    rowPerView: 2
  }
})
const godetail = (id: string) => {
  router.push(`/detail?id=${id}`)
}
// let arr = [1, 2, 3]
// 触底函数
window.addEventListener('scroll', throttle(onBottom, 1000))

// 触底相应函数
function onBottom() {
  if (!loading.value) {
    return
  }
  // 获取可视高度
  let clientHeight = document.documentElement.clientHeight
  // console.log('打印高度', clientHeight)

  // 获取滚动高度
  let scrollTop = document.documentElement.scrollTop
  // console.log('打印scrollTop', scrollTop)

  // 滚动条高度
  let scrollHeight = document.documentElement.scrollHeight
  if (clientHeight + scrollTop >= scrollHeight - 170) {
    // console.log('触底之前', waterfallList.value.length)
    waterfallList.value = [...waterfallList.value, ...testList.value]
  }
}
onMounted(async () => {
  let res = await getPostService()
  waterfallList.value = [...waterfallList.value, ...res.data.data]
})
</script>
<style lang="scss" scoped>
.safeTop {
  width: 100%;
  background-color: #f5f5f5;
  height: 46px;
}
.waterfall-list[data-v-1c4c57b0] {
  background-color: #f5f5f5;
  .card {
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    .card-img {
      width: 100%;
    }
    .card-text {
      width: 100%;
      overflow: hidden;
      .card-text-top {
        margin: 2px auto;
        width: 93%;
        font-size: 14px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-clamp: 2;
        color: black;
      }
      .card-text-bottom {
        width: 93%;
        margin: 6px auto 6px;
        display: flex;
        align-items: center;
        .card-text-bottom-img {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          overflow: hidden;
        }
        .card-text-bottom-name {
          margin-left: 6px;
          font-size: 8px;
          color: #8e8e8e;
        }
        .card-text-bottom-like {
          margin-left: auto;
          margin-right: 0px;
          font-size: 11px;
          color: #8e8e8e;
        }
      }
    }
  }
}
</style>
