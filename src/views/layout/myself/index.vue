<template>
  <div ref="navTopRef" :class="[isBrown ? 'nav-top-brown' : 'nav-top']">
    <van-icon name="wap-nav" @click="() => (showLeft = true)" />
    <img v-show="isBrown" class="nav-top-avatar" :src="useStore.userInfo.avatar" alt="" />
    <van-icon name="ellipsis" />
  </div>
  <div class="myself-bg">
    <div class="myself-bg-safe" ref="myselfbgRef"></div>
    <div class="myself-bg-top" ref="myselfbgtopRef">
      <img class="myself-top-avatar" :src="useStore.userInfo.avatar" alt="" />
      <div class="myself-top-name">
        <div>{{ useStore.userInfo.nick_name }}</div>
        <div class="myself-top-username1">小红书号：xhs{{ useStore.userInfo.username }}</div>
        <div class="myself-top-username2">IP属地：北京</div>
      </div>
    </div>
    <div class="myself-bg-middle">{{ useStore.userInfo.signature }}</div>
    <div class="myself-bg-bottom">
      <div class="myself-bottom-num-part" @click="goFollows">
        <div class="myself-bottom-num">{{ useStore.followsLength }}</div>
        <div class="myself-bottom-title">关注</div>
      </div>
      <div class="myself-bottom-num-part">
        <div class="myself-bottom-num">1048</div>
        <div class="myself-bottom-title">粉丝</div>
      </div>
      <div class="myself-bottom-num-part">
        <div class="myself-bottom-num">4822</div>
        <div class="myself-bottom-title">获赞</div>
      </div>
      <van-button @click="goProfile" round class="btn">编辑资料</van-button>
      <van-button round icon="setting-o" type="primary" class="msg" />
    </div>
    <div class="white-title">笔记</div>
  </div>
  <Waterfall
    :delay="5"
    :posDuration="10"
    :animationDelay="30"
    :animationDuration="5"
    :gutter="4"
    :list="waterfallArr"
    :breakpoints="breakpoints"
  >
    <template #default="{ item }">
      <div @click="godetail(item.id)" class="card">
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

  <!-- 左侧弹出 -->
  <van-popup v-model:show="showLeft" position="left" :style="{ width: '70%', height: '100%' }">
    <!--  -->
    <div class="left-main">
      <van-button round @click="logout" class="setting-btn">退出</van-button>
    </div>
  </van-popup>
</template>
<script lang="ts" setup>
import { Waterfall, LazyImg } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
import { ref, onMounted } from 'vue'
import { getUserPostService } from '@/api/post'
import { useRouter } from 'vue-router'
import { useNumStore } from '@/stores'
import socket from '@/utils/connectSocket'
import { throttle } from '@/utils/throttle'

const showLeft = ref<boolean>(false)
const router = useRouter()
const useStore = useNumStore()
const waterfallArr = ref()
const navTopRef = ref<any>()
const navTopScrollHeight = ref()
const myselfbgRef = ref<any>()
const myselfbgtopRef = ref<any>()
const isBrown = ref(false)
const goProfile = () => {
  router.push('/profile')
}
const logout = () => {
  socket.emit('logout', useStore.userInfo.username)
  useStore.clearToken()
  showLeft.value = false
  setTimeout(() => {
    router.push('/login')
  }, 300)
}
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
const goFollows = () => {
  router.push('/follows')
}
const godetail = (id: string) => {
  router.push(`/detail?id=${id}`)
}
// 触底函数
async function onBottom() {
  // 获取滚动高度
  let scrollTop = document.documentElement.scrollTop

  if (scrollTop > navTopScrollHeight.value) {
    isBrown.value = true
  } else {
    isBrown.value = false
  }
}
let throttledScroll = throttle(onBottom, 300)
document.addEventListener('scroll', throttledScroll)
onMounted(async () => {
  let res = await getUserPostService({ username: useStore.userInfo.username })
  console.log('打印个人帖子', res.data.data)
  waterfallArr.value = res.data.data

  navTopScrollHeight.value = myselfbgRef.value.clientHeight + myselfbgtopRef.value.clientHeight
  console.log('打印topNav高度', navTopScrollHeight.value)
})
</script>

<style lang="scss" scoped>
.nav-top {
  display: flex;
  position: fixed;
  z-index: 990;
  top: 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  padding: 8px 0;
  background-color: transparent;
  // background-color: pink;
  // background-color: salmon;
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
    // background-color: #fff;
  }
}

.nav-top-brown {
  display: flex;
  position: fixed;
  z-index: 990;
  top: 0;
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

.myself-bg {
  padding: 40px 0px 0px;
  min-height: 210px;
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
      height: 27px;
      width: 86px;
      // padding: 0;
      margin-left: auto;
      color: #ffffff;
      border: 1px solid #ffffff;
      background-color: transparent;
      font-size: 12px;
    }
    .msg {
      height: 27px;
      width: 38px;
      // padding: 0;
      margin-left: 10px;
      color: #ffffff;
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
      color: #ffffff;
      border-color: var(--theme-color);
      background-color: var(--theme-color);
    }
  }
}
</style>
