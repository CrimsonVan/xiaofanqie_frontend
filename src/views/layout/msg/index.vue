<template>
  <van-nav-bar title="消息" :fixed="true" @click-left="onClickLeft">
    <template #right>
      <van-icon name="friends-o" />
      <span class="chat-nav-text">发现群聊</span>
    </template>
  </van-nav-bar>
  <div class="safeTop"></div>
  <van-search v-model="searchValue" placeholder="请输入搜索关键词"> </van-search>
  <!-- 聊天信息通知 -->
  <div @click="goChat" class="messageItem">
    <img
      class="chat-person"
      src="https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/s28447008.jpg"
      alt=""
    />
    <div class="chat-to-info">
      <div>煮面公主</div>
      <div class="chat-to-msg">还在犹豫</div>
    </div>
    <div class="chat-to-data">
      <span>10-28</span>
      <van-icon name="minus" badge="2" color="#ffffff" />
    </div>
  </div>
  <div @click="goChat" class="messageItem">
    <img
      class="chat-person"
      src="https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/e69858186deb93429436ec0b194e3967_720.jpg"
      alt=""
    />
    <div class="chat-to-info">
      <div>绝命火鸡面</div>
      <div class="chat-to-msg">可在？</div>
    </div>
    <div class="chat-to-data">
      <span>10-29</span>
      <van-icon name="minus" badge="1" color="#ffffff" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const onClickLeft = () => history.back()
const searchValue = ref()
const goChat = () => {
  router.push('/chat')
}
</script>
<style lang="scss" scoped>
.safeTop {
  width: 100%;
  background-color: #ffffff;
  height: 46px;
}
::v-deep(.van-nav-bar__right) {
  //   background-color: saddlebrown;
  padding: 0 8px;
  font-size: 20px;
  .chat-nav-text {
    font-size: 15px;
  }
}
.messageItem {
  width: 100%;
  height: 42px;
  margin: 16px 0;
  padding: 0 var(--van-search-padding);
  display: flex;
  align-items: center;
  .chat-person {
    width: 41px;
    height: 41px;
    overflow: hidden;
    border-radius: 50%;
  }
  .chat-to-info {
    height: 40px;
    margin-left: 10px;
    min-width: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // background-color: salmon;
    font-size: 15px;
    color: black;
    .chat-to-msg {
      font-size: 14px;
      color: #8a8a8a;
    }
  }
  .chat-to-data {
    height: 35px;
    font-size: 12px;
    color: #8a8a8a;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    // background-color: salmon;
  }
}
</style>
