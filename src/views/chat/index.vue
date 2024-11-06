<template>
  <van-nav-bar style="background-color: #f5f5f5" :fixed="true">
    <template #left>
      <van-icon name="arrow-left" @click="onClickLeft" />
      <img @click="goOther" class="nav-avatar" :src="friendAvatar" alt="" />
      <span class="nav-name">{{ friendName }}</span>
    </template>
    <template #right>
      <van-icon name="share-o" />
    </template>
  </van-nav-bar>
  <div class="chatArea">
    <div class="chat-msg-item-left" v-for="item in msgArr" :key="item.id">
      <!-- 本人发的消息 -->
      <div v-if="useStore.userInfo.username === item.fromUsername" class="msgBox">
        <div class="msg-item-content-right">
          {{ item.msg }}
        </div>
        <img class="msg-item-avatar-right" :src="item.fromAvatar" alt="" />
      </div>
      <!-- 对方发的消息 -->
      <div v-else class="msgBox">
        <img class="msg-item-avatar-left" :src="item.fromAvatar" alt="" />
        <div class="msg-item-content-left">
          {{ item.msg }}
        </div>
      </div>
    </div>
  </div>

  <div class="bottom-input">
    <van-icon name="volume-o" />
    <van-field
      v-model="message"
      rows="1"
      autosize
      class="inp"
      type="textarea"
      placeholder="发消息..."
    />
    <van-icon @click="sendMsg" name="smile-o" />
    <van-icon name="add-o" />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import socket from '@/utils/connectSocket'
import { useNumStore } from '@/stores'
import { getChatMsg } from '@/api/msg'

const useStore = useNumStore()
const router = useRouter()
const route = useRoute()
const msgArr = ref() //聊天信息列表
const message = ref() //输入栏消息
const friendName = ref() //左上角好友名字
const friendAvatar = ref() //左上角好友头像
const friendUsername = ref() //左上角好友的用户名
const onClickLeft = () => {
  router.push('/msg')
}
const sendMsg = () => {
  if (!message.value) {
    console.log('输入内容不能为空')
    return
  }
  console.log('打印发送的信息', message.value)
  let sendObj = {
    fromUsername: useStore.userInfo.username,
    fromNickname: useStore.userInfo.nick_name,
    fromAvatar: useStore.userInfo.avatar,
    msg: message.value,
    toUsername: friendUsername.value,
    toNickname: friendName.value,
    toAvatar: friendAvatar.value
  }
  msgArr.value.push(sendObj)
  socket.emit('msg', sendObj)
  message.value = null
}
// 接受对方发来的一对一消息
socket.on('toOneMsg', (res) => {
  console.log('打印对方发来的信息', res)
  msgArr.value.push(res)
})
const goOther = () => {
  router.push(`/other?username=${friendUsername.value}`)
}
onMounted(async () => {
  socket.emit('join', useStore.userInfo.username)
  friendUsername.value = route.query.toUsername
  friendName.value = route.query.friendName
  friendAvatar.value = route.query.friendAvatar
  // 获取历史聊天信息
  let res = await getChatMsg({
    fromUsername: route.query.fromUsername,
    toUsername: route.query.toUsername
  })
  msgArr.value = res.data.data
})
</script>
<style lang="scss" scoped>
::v-deep(.van-nav-bar__left) {
  //   background-color: saddlebrown;
  padding: 0 2px;
  font-size: 20px;
}
::v-deep(.van-nav-bar__right) {
  //   background-color: saddlebrown;
  padding: 0 8px;
  font-size: 20px;
}
.nav-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 2px;
}
.nav-name {
  margin-left: 5px;
  font-size: 12px;
  color: #333333;
}
.nav-btn {
  border-radius: 14px;
  height: 56%;
  margin-right: 8px;
}
.van-safe-area-bottom {
  border-top: 1px solid #ccc;
}
.chatArea {
  min-height: 100vh;
  background-color: #f5f5f5;
  width: 100%;
  padding: 46px 12px;
  .chat-msg-item-left {
    width: 100%;
    min-height: 34px;
    margin: 16px 0;

    .msgBox {
      display: flex;
      align-items: flex-start;
      .msg-item-avatar-left {
        width: 31px;
        height: 31px;
        border-radius: 50%;
        overflow: hidden;
      }
      .msg-item-content-left {
        margin-left: 10px;
        min-height: 31px;
        max-width: 270px;
        background-color: #ffffff;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px 12px;
      }
      .msg-item-avatar-right {
        width: 31px;
        height: 31px;
        border-radius: 50%;
        overflow: hidden;
      }
      .msg-item-content-right {
        margin-right: 10px;
        margin-left: auto;
        min-height: 31px;
        max-width: 270px;
        background-color: #388aef;
        color: #ffffff;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px 12px;
      }
    }
  }

  .chat-msg-item-right {
    width: 100%;
    min-height: 34px;
    margin: 16px 0;
    display: flex;
    align-items: flex-start;
    .msg-item-avatar-right {
      width: 31px;
      height: 31px;
      border-radius: 50%;
      overflow: hidden;
    }
    .msg-item-content-right {
      margin-right: 10px;
      margin-left: auto;
      min-height: 31px;
      max-width: 270px;
      background-color: #388aef;
      color: #ffffff;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px 12px;
    }
  }
}
.bottom-input {
  position: fixed;
  bottom: 0;
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 8px 0;
  .van-icon {
    // color: #388aef;
    font-size: 26px;
  }
  .inp {
    width: 73%;
    padding: 4px;
    border-radius: 4px;
  }
}
</style>
