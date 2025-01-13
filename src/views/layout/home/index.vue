<template>
  <van-nav-bar :fixed="true" title="发现">
    <template #left>
      <van-icon name="wap-nav" size="18" />
    </template>
    <template #right>
      <van-icon @click="() => router.push('/search')" name="search" size="18" />
    </template>
  </van-nav-bar>
  <div class="safeTop"></div>
  <div class="scroll-nav" ref="cate_recommend_area_dom">
    <div
      class="scroll-nav-item"
      v-for="(item, index) in cateList"
      :class="index === activeCateIndex ? 'active' : ''"
      :key="index"
      @click="selectCate(index, item)"
    >
      {{ item.cate_name }}
    </div>
  </div>
  <Waterfall
    :delay="5"
    :posDuration="10"
    :animationDelay="30"
    :animationDuration="5"
    :gutter="4"
    :list="waterfallList"
    :breakpoints="breakpoints"
    :lazyload="lazt"
  >
    <template #default="{ item }">
      <div class="card">
        <LazyImg
          @click="() => router.push(`/detail?id=${item.id}`)"
          class="card-img"
          :url="item.content_img.split(',')[0]"
        />
        <div class="card-text">
          <div class="card-text-top">{{ item.content }}</div>
          <div class="card-text-bottom">
            <img class="card-text-bottom-img" :src="item.avatar" alt="" />
            <span class="card-text-bottom-name">{{ item.nick_name }}</span>
            <likeButton v-if="item" :detailInfo="item"></likeButton>
            <span class="card-text-bottom-like">2791</span>
          </div>
        </div>
      </div>
    </template>
  </Waterfall>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import 'vue-waterfall-plugin-next/dist/style.css'
import { Waterfall, LazyImg } from 'vue-waterfall-plugin-next'
import { useRouter } from 'vue-router'
import { getPostService } from '@/api/post'
import { getPostCateService } from '@/api/cate'
import { throttle } from '@/utils/throttle'
import type { postAllDataRes, postData } from '@/type/post'
import type { cateAllDataRes, cateData } from '@/type/cate'
const router = useRouter()
const lazt = ref<boolean>(true)
const isDataEnd = ref<boolean>(false) //是否所有数据加载完毕
const isLoading = ref<boolean>(false) //是否在加载数据
const isDataEnd2 = ref<boolean>(false) //是否所有数据加载完毕
const isLoading2 = ref<boolean>(false) //是否在加载数据
const waterfallList = ref<postData[]>([]) //瀑布流数据
const cateList = ref<cateData[]>([]) //帖子分类列表
const activeCateIndex = ref<number>(0) //当前选中分类
const cate_recommend_area_dom = ref<any>(null) //分类列表dom
const curCatesPagenum = ref<number>(1)
const reqQuery = ref<{
  pagenum: number
  cate_id?: number
}>({
  pagenum: 1
})
//瀑布流参数
const breakpoints = ref<any>({
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
//选择分类
const selectCate = async (index: number, item: cateData) => {
  activeCateIndex.value = index
  reqQuery.value.cate_id = item.cate_id
  reqQuery.value.pagenum = 1
  isDataEnd.value = false //是否所有数据加载完毕
  isLoading.value = false //是否在加载数据
  let res: postAllDataRes = await getPostService(reqQuery.value)
  waterfallList.value = res.data.data
}
// 触底函数
async function onBottom() {
  // 获取可视高度
  let clientHeight = document.documentElement.clientHeight
  // 获取滚动高度
  let scrollTop = document.documentElement.scrollTop
  // 滚动条高度
  let scrollHeight = document.documentElement.scrollHeight
  if (clientHeight + scrollTop >= scrollHeight - 170 && !isDataEnd.value && !isLoading.value) {
    reqQuery.value.pagenum++
    isLoading.value = true
    let res: postAllDataRes = await getPostService(reqQuery.value)
    isLoading.value = false
    if (res.data.data.length < 8) {
      isDataEnd.value = true
    }
    waterfallList.value = [...waterfallList.value, ...res.data.data]
  }
}
// 将触底函数节流
let throttledScroll = throttle(onBottom, 300)
//滚动监听触发函数
const cateScroll = async () => {
  if (
    cate_recommend_area_dom.value.clientWidth + cate_recommend_area_dom.value.scrollLeft >=
      cate_recommend_area_dom.value.scrollWidth - 50 &&
    !isDataEnd2.value &&
    !isLoading2.value
  ) {
    curCatesPagenum.value++
    isLoading2.value = true
    let res: cateAllDataRes = await getPostCateService({ pagenum: curCatesPagenum.value })
    cateList.value = [...cateList.value, ...res.data.data]
    if (res.data.data.length < 8) {
      isDataEnd2.value = true
    }
    isLoading2.value = false
  }
}
onMounted(async () => {
  //监听滚动
  document.addEventListener('scroll', throttledScroll)
  // 获取分类列表
  let result: cateAllDataRes = await getPostCateService(reqQuery.value)
  result.data.data.unshift({
    cate_name: '推荐'
  })
  cateList.value = result.data.data
  console.log('打印分类列表', cateList.value)

  cate_recommend_area_dom.value.addEventListener('scroll', cateScroll)
  //获取贴子列表
  let res: postAllDataRes = await getPostService(reqQuery.value)
  waterfallList.value = res.data.data
})

onUnmounted(() => {
  document.removeEventListener('scroll', throttledScroll)
})
</script>
<style lang="scss" scoped>
.safeTop {
  width: 100%;
  background-color: #f5f5f5;
  height: 81px;
}
.scroll-nav {
  z-index: 999;
  position: fixed;
  top: 46px;
  right: 0;
  width: 100%;
  height: 35px;
  background-color: #fff;
  overflow-x: scroll;
  white-space: nowrap;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  }
  .scroll-nav-item {
    margin-left: 10px;
    font-size: 15px;
    padding-left: 10px;
    padding-right: 10px;
    height: 27px;
    border-radius: 10px;
    line-height: 27px;
    text-align: center;
    &:last-child {
      margin-right: 10px;
    }
    &.active {
      background-color: #f5f5f5;
      color: black;
      font-weight: 600;
    }
  }
}

.waterfall-list[data-v-1c4c57b0] {
  // background-color: #f5f5f5;
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
        ::v-deep(.like_btn) {
          margin-left: auto;
          font-size: 12px;
        }
        ::v-deep(.like_btn_active) {
          margin-left: auto;
          font-size: 12px;
        }
        .card-text-bottom-like {
          margin-left: 3px;
          margin-right: 0px;
          margin-top: 1px;
          font-size: 10px;
          color: #8e8e8e;
        }
      }
    }
  }
}
</style>
