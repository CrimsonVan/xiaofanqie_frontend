<template>
  <div style="background-color: #f5f5f5; width: 100%; min-height: 100vh; overflow: hidden">
    <div class="search-top">
      <van-icon name="arrow-left" @click="() => router.back()" />
      <van-search
        class="search"
        @search="goSearch(searchValue)"
        show-action
        v-model="searchValue"
        placeholder="请输入想搜索的人吧"
      >
        <template #action>
          <div @click="goSearch(searchValue)">搜索</div>
        </template>
      </van-search>
    </div>

    <div class="history">
      <div class="history-header">
        <div>历史记录</div>
        <van-icon name="delete-o" @click="clearHistory" />
      </div>
      <div v-if="useStore.history.length !== 0" class="history-main">
        <div
          v-for="(item, index) in useStore.history"
          :key="index"
          class="history-item"
          @click="goSearch(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>

    <Waterfall
      v-if="waterfallList"
      :delay="5"
      :posDuration="10"
      :animationDelay="30"
      :animationDuration="5"
      :gutter="4"
      :list="waterfallList"
      :breakpoints="breakpoints"
    >
      <template #default="{ item }">
        <div @click="() => router.push(`/detail?id=${item.id}`)" class="card">
          <!-- <img class="card-img" :src="item.content_img" alt="" /> -->
          <LazyImg class="card-img" :url="item.content_img.split(',')[0]" />
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
  </div>
</template>
<script setup lang="ts" name="Search">
import { getSearchPostService } from '@/api/post'
import { Waterfall, LazyImg } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNumStore } from '@/stores'
import type { postAllDataRes, postData } from '@/type/post'
import { showConfirmDialog } from 'vant'

const useStore = useNumStore()
const router = useRouter()
const clearHistory = () => {
  showConfirmDialog({
    message: '确定要删除搜索历史记录吗？'
  })
    .then(() => {
      // on confirm
      useStore.clearHistory()
    })
    .catch(() => {
      // on cancel
    })
}
const waterfallList = ref<postData[]>([])
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
const searchValue = ref<string>('')
//搜索函数
const goSearch = async (str: string) => {
  if (str === '') {
    console.log('输入不能为空')
    return
  }
  useStore.setHistory(str)
  let res: postAllDataRes = await getSearchPostService({ query: str })
  console.log('打印搜索结果', res.data.data.length)
  waterfallList.value = res.data.data
}
</script>
<style lang="scss" scoped>
.search-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
  padding: 0 6px;
  .van-icon-arrow-left {
    font-size: 21px;
  }
  .search {
    width: 94%;
    padding: 2px 0px 2px 5px;
    background-color: #f5f5f5;
    ::v-deep(.van-search__content--square) {
      background-color: #ffffff;
    }
  }
}
.history {
  width: 100%;
  padding: 10px 10px 0px;
  font-size: 13px;
  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-icon-delete-o {
      font-size: 16px;
      margin-left: auto;
      margin-right: 4px;
    }
  }
  .history-main {
    margin-top: 12px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .history-item {
      width: fit-content;

      border: 1px solid #ccc;
      border-radius: 13px;
      padding: 4px 8px;
      margin-right: 10px;
      margin-bottom: 8px;
    }
  }
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
