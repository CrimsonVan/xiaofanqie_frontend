<template>
  <div class="nav-top">
    <!-- <van-icon name="wap-nav" /> -->
    <van-icon @click="goback" name="arrow-left" />
    <van-icon name="ellipsis" />
  </div>
  <div class="myself-bg">
    <div class="myself-bg-top">
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
        <div class="myself-bottom-num">48</div>
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
      <followButton
        :isOther="true"
        :detailInfo="{ type: 'otherInfo', ...otherInfo }"
      ></followButton>
      <van-button @click="goChat" round icon="chat-o" type="primary" class="msg" />
    </div>
    <div class="white-title">笔记</div>
  </div>
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
const useStore = useNumStore()
const route = useRoute()
const router = useRouter()
const otherInfo = ref()
const waterfallList = ref()
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
const goback = () => {
  router.back()
}
const goChat = () => {
  let fromUsername = useStore.userInfo.username
  let toUsername = otherInfo.value.username
  router.push(
    `/chat?fromUsername=${fromUsername}&toUsername=${toUsername}&friendName=${otherInfo.value.nick_name}&friendAvatar=${otherInfo.value.avatar}`
  )
}
const godetail = (id: number) => {
  router.push(`/detail?id=${id}`)
}
onMounted(async () => {
  let res = await userGetInfoService({ username: route.query.username as string })
  otherInfo.value = res.data.data
  let res1 = await getUserPostService({ username: route.query.username as string })
  console.log('打印res1', res1.data.data[0])
  waterfallList.value = res1.data.data
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
  // background-color: salmon;
  color: #ffffff;
  .van-icon-arrow-left {
    margin-left: 4px;
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
.myself-bg {
  padding: 50px 0px 0px;
  // width: 100%;
  min-height: 210px;
  background-color: #6f6161;
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
