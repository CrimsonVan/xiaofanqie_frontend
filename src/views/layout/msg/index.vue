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
  <div v-for="(item, index) in friendArr" :key="index" @click="goChat(index)" class="messageItem">
    <img class="chat-person" :src="item.friendAvatar" alt="" />
    <div class="chat-to-info">
      <div>{{ item.friendNickname }}</div>
      <div class="chat-to-msg">{{ item.lastMsg }}</div>
    </div>
    <div class="chat-to-data">
      <span>10-28</span>
      <van-icon name="minus" badge="2" color="#ffffff" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getFriendsService } from '@/api/friends'
import { useNumStore } from '@/stores'
import socket from '@/utils/connectSocket'
const useStore = useNumStore()
const router = useRouter()
const onClickLeft = () => history.back()
const searchValue = ref()
const friendArr = ref()
const goChat = (index: any) => {
  let fromUsername = useStore.userInfo.username
  let toUsername = friendArr.value[index].friendName
  let toAvatar = friendArr.value[index].friendAvatar
  let toNickname = friendArr.value[index].friendNickname
  router.push(
    `/chat?fromUsername=${fromUsername}&toUsername=${toUsername}&friendName=${toNickname}&friendAvatar=${toAvatar}`
  )
}
// 接受对方发来的一对一消息
socket.on('toOneMsg', (res) => {
  console.log('在好友列表打印对方发来的信息', res)
  //看看有无发送过来即时信息的fromUsername和好友列表里人的friendName一样的
  let findIndex = friendArr.value.findIndex((item: any) => item.friendName === res.fromUsername)
  if (findIndex === -1) {
    console.log('没有在好友列表')
    let obj = {
      friendAvatar: res.fromAvatar,
      friendName: res.fromUsername,
      friendNickname: res.fromNickname,
      lastMsg: res.msg,
      userAvatar: res.toAvatar,
      userNickname: res.toNickname,
      username: res.toUsername
    }
    friendArr.value.push(obj)
  } else {
    console.log('在好友列表')
    friendArr.value[findIndex].lastMsg = res.msg
  }
})
onMounted(async () => {
  let res = await getFriendsService({ username: useStore.userInfo.username })
  console.log('打印好友列表', res.data.data)
  friendArr.value = res.data.data
})
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
