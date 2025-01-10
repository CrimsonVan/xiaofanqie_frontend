<template>
  <!-- 固定导航 -->
  <div class="fixedNav">
    <div ref="navTopDom" :class="[isBrown ? 'nav-top-brown' : 'nav-top']">
      <van-icon name="wap-nav" @click="() => router.back()" />
      <img v-show="isBrown" class="nav-top-avatar" :src="otherInfo?.avatar" alt="" />
      <van-icon name="ellipsis" />
    </div>
    <div class="whiteFixed" :class="[isWhite ? 'whiteFixed_active' : 'whiteFixed']">
      <div class="whiteFixedNote">笔记</div>
    </div>
  </div>
  <!-- 主页信息 -->
  <div class="myself-bg" ref="myselfbgDom">
    <div class="myself-bg-safe" ref="safeSpaceDom"></div>
    <div class="myself-bg-top" ref="topInfoDom">
      <img class="myself-top-avatar" :src="otherInfo?.avatar" alt="" />
      <div class="myself-top-name">
        <div>{{ otherInfo?.nick_name }}</div>
        <div class="myself-top-username1">小红书号：xhs{{ otherInfo?.username }}</div>
        <div class="myself-top-username2">IP属地：北京</div>
      </div>
    </div>
    <div class="myself-bg-middle">肚子好饿~~~</div>
    <div class="myself-bg-bottom">
      <div class="myself-bottom-num-part">
        <div class="myself-bottom-num">{{ otherInfo?.follow_num }}</div>
        <div
          @click="() => router.push(`/follows?type=other&username=${otherInfo?.username}`)"
          class="myself-bottom-title"
        >
          关注
        </div>
      </div>
      <div class="myself-bottom-num-part">
        <div class="myself-bottom-num">{{ otherInfo?.fans_num }}</div>
        <div
          @click="() => router.push(`/fans?type=other&username=${otherInfo?.username}`)"
          class="myself-bottom-title"
        >
          粉丝
        </div>
      </div>
      <div class="myself-bottom-num-part">
        <div class="myself-bottom-num">4822</div>
        <div class="myself-bottom-title">获赞</div>
      </div>
      <followButton :isOther="true" :detailInfo="otherInfo"></followButton>
      <van-button
        @click="
          () =>
            router.push(
              `/chat?fromUsername=${useStore.userInfo.username}&toUsername=${otherInfo?.username}&friendName=${otherInfo?.nick_name}&friendAvatar=${otherInfo?.avatar}`
            )
        "
        round
        icon="chat-o"
        type="primary"
        class="msg"
      />
    </div>
    <div class="white-title" ref="whiteTitleDom">笔记</div>
  </div>
  <!-- 瀑布流 -->
  <Waterfall
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
</template>
<script lang="ts" setup>
import { Waterfall, LazyImg } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
import { ref, onMounted } from 'vue'
import { userGetInfoService } from '@/api/user'
import { useRoute, useRouter } from 'vue-router'
import { useNumStore } from '@/stores'
import { getUserPostService } from '@/api/post'
import followButton from '@/components/followButton.vue'
import type { userInfoDataAllRes, userInfoData } from '@/type/user'
import type { postData, postAllDataRes } from '@/type/post'
const useStore = useNumStore()
const route = useRoute()
const router = useRouter()
const otherInfo = ref<userInfoData>()
const navAvatarShowHeight = ref<number>() //导航栏显示头像所需滚动高度
const whiteTitleFixedHeight = ref<number>() //笔记固定所需的滚动的高度
const navTopDom = ref<any>(null) //头部导航的dom
const safeSpaceDom = ref<any>(null) //安全区域dom
const topInfoDom = ref<any>(null) //上半部分个人信息区域dom
const myselfbgDom = ref<any>(null) //整个个人信息区域dom
const whiteTitleDom = ref<any>(null) //笔记标题dom
const waterfallList = ref<Array<postData>>() //帖子列表
const isBrown = ref<boolean>(false) //头部导航的头像是否固定
const isWhite = ref<boolean>(false) //笔记标题是否固定
//瀑布流参数设置
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
// 触底函数
const onBottom = () => {
  // 获取滚动高度
  let scrollTop = document.documentElement.scrollTop
  if (scrollTop > (navAvatarShowHeight.value as number)) {
    isBrown.value = true
  } else {
    isBrown.value = false
  }
  if (scrollTop > (whiteTitleFixedHeight.value as number)) {
    isWhite.value = true
  } else {
    isWhite.value = false
  }
}
onMounted(async () => {
  document.addEventListener('scroll', onBottom)
  let res: userInfoDataAllRes = await userGetInfoService({
    username: route.query.username as string
  })
  otherInfo.value = res.data.data
  let res1: postAllDataRes = await getUserPostService({ username: route.query.username as string })
  waterfallList.value = res1.data.data
  navAvatarShowHeight.value = safeSpaceDom.value.clientHeight + topInfoDom.value.clientHeight
  whiteTitleFixedHeight.value =
    myselfbgDom.value.clientHeight - whiteTitleDom.value.clientHeight - navTopDom.value.clientHeight
})
</script>
<style lang="scss" scoped>
.fixedNav {
  position: fixed;
  z-index: 990;
  top: 0;
  width: 100%;
  .nav-top {
    display: flex;
    height: 36px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    padding: 8px 0;
    background-color: transparent;
    color: #ffffff;
    .van-icon-wap-nav {
      margin-left: 8px;
    }
    .van-icon-ellipsis {
      margin-right: 8px;
    }
    .nav-top-avatar {
      width: 24px;
      height: 24px;
      overflow: hidden;
      border-radius: 50%;
    }
  }
  .nav-top-brown {
    display: flex;
    height: 36px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    padding: 8px 0;
    background-color: #6f6161;
    color: #ffffff;
    .van-icon-wap-nav {
      margin-left: 8px;
    }
    .van-icon-ellipsis {
      margin-right: 8px;
    }
    .nav-top-avatar {
      width: 24px;
      height: 24px;
      overflow: hidden;
      border-radius: 50%;
      background-color: #ffffff;
    }
  }
  .whiteFixed {
    visibility: hidden;
    width: 100%;
    background-color: #6f6161;
    height: 36px;
  }
  .whiteFixed_active {
    visibility: visible;
    width: 100%;
    background-color: #6f6161;
    height: 36px;
    .whiteFixedNote {
      background-color: #ffffff;
      height: 100%;
      border-radius: 12px 12px 0 0;
      margin-bottom: 0;
      padding: 8px 10px;
      font-size: 14px;
    }
  }
}
.myself-bg {
  padding: 36px 0px 0px;
  overflow: hidden;
  background-color: #6f6161;
  .myself-bg-safe {
    width: 100%;
    height: 10px;
  }
  .myself-bg-top {
    // width: 100%;
    margin: 0 10px;
    // background-color: sandybrown;
    display: flex;
    align-items: center;
    .myself-top-avatar {
      width: 60px;
      height: 60px;
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid white;
    }
    .myself-top-name {
      min-width: 75px;
      height: 60px;
      // background-color: salmon;
      margin-left: 12px;
      color: white;
      font-weight: 600;
      padding-top: 4px;
      .myself-top-username1 {
        font-size: 8px;
        color: #ccc;
        margin-top: 6px;
      }
      .myself-top-username2 {
        font-size: 8px;
        color: #ccc;
        margin-top: 1px;
      }
    }
  }
  .myself-bg-middle {
    margin: 18px 10px;
    // width: 100%;
    // background-color: sandybrown;
    font-size: 12px;
    color: #ffffff;
  }
  .myself-bg-bottom {
    margin: 34px 10px 10px;
    // width: 100%;
    // background-color: sandybrown;
    display: flex;
    align-items: center;
    .myself-bottom-num-part {
      // background-color: salmon;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 10px;
      &:nth-child(1) {
        margin-left: 0;
      }
      &:nth-child(3) {
        margin-right: auto;
      }
      .myself-bottom-num {
        color: #ffffff;
        font-size: 15px;
      }
      .myself-bottom-title {
        font-size: 10px;
        color: #f5f5f5;
      }
    }
    .btn {
      height: 25px;
      margin-left: auto;
    }
    .msg {
      height: 25px;
      margin-left: 8px;
      border: 1px solid #ffffff;
      background-color: transparent;
    }
  }
  .white-title {
    width: 100%;
    background-color: #ffffff;
    // background-color: salmon;
    height: 36px;
    border-radius: 12px 12px 0 0;
    margin-bottom: 0;
    padding: 8px 10px;
    font-size: 14px;
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
.van-popup {
  background-color: #f5f5f5;

  .left-main {
    width: 100%;
    background-color: salmon;
    background-color: #f5f5f5;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .setting-btn {
      width: 220px;
      margin-top: auto;
      margin-bottom: 14px;
    }
  }
}
</style>
