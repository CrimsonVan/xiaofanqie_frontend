<template>
  <van-nav-bar class="nav_header1">
    <template #left>
      <van-icon name="arrow-left" @click="onClickLeft" />
      <img @click="goOther" class="nav-avatar" :src="friendAvatar" alt="" />
      <span class="nav-name">{{ friendName }}</span>
    </template>
    <template #right>
      <van-icon name="share-o" />
    </template>
  </van-nav-bar>
  <div class="chatArea" ref="chatAreaDom">
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
  <div v-if="showEmoji" class="emoji-safeArea"></div>
  <div class="fixed-bottom">
    <div class="bottom-input">
      <van-icon name="volume-o" />
      <van-field
        v-model="message"
        rows="1"
        autosize
        class="inp"
        type="textarea"
        placeholder="发消息..."
        @click-input="testFocus"
        @keydown="search2($event)"
      />
      <van-icon @click="showEmo" name="smile-o" />
      <van-button :disabled="isMessageEmpty" class="send-btn" @click="sendMsg">发送</van-button>
    </div>
    <div v-if="showEmoji" class="bottom-emoji">
      <div class="bottom-emoji-line" v-for="(line, index) in emojiArr" :key="index">
        <div class="emoji-item" @click="getEmoji(item)" v-for="(item, index) in line" :key="index">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import socket from '@/utils/connectSocket'
import { useNumStore } from '@/stores'
import { getChatMsg } from '@/api/msg'
import type { msgData, msgDataAllRes } from '@/type/msg'
import { emojiArr } from './emoji'
const useStore = useNumStore()
const router = useRouter()
const route = useRoute()
const chatAreaDom = ref<any>(null)
const msgArr = ref<msgData[]>([]) //聊天信息列表
const message = ref<string>('') //输入栏消息
const friendName = ref<string>('') //左上角好友名字
const friendAvatar = ref<string>('') //左上角好友头像
const friendUsername = ref<string>('') //左上角好友的用户名
const isMessageEmpty = computed(() => message.value === '') //判断输入框是否为空
const showEmoji = ref<boolean>(false) //表情列表是否显示
const testFocus = () => {
  console.log('focus了')
  showEmoji.value = false
  // nextTick(() => {
  //   reachBottom()
  // })
}
const search2 = (e: any) => {
  if (e.key === 'Enter') {
    console.log('Enter')
  }
}

const onClickLeft = () => {
  router.back()
}
//像后端发送讯息
const sendMsg = () => {
  if (message.value === '') {
    return
  }

  let sendObj: msgData = {
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
  message.value = ''
  nextTick(() => {
    reachBottom()
  })
}
const getEmoji = (emo: string) => {
  message.value = message.value + emo
}
const showEmo = () => {
  showEmoji.value = !showEmoji.value
  nextTick(() => {
    reachBottom()
  })
}
// 接受对方发来的一对一消息
socket.on('toOneMsg', (res: msgData) => {
  msgArr.value.push(res)
  nextTick(() => {
    reachBottom()
  })
})

const goOther = () => {
  router.push(`/other?username=${friendUsername.value}`)
}
//触底操作
function reachBottom() {
  console.log('打印height', chatAreaDom.value.scrollHeight, chatAreaDom.value.clientHeight)

  chatAreaDom.value.scrollTop =
    chatAreaDom.value.scrollHeight - chatAreaDom.value.clientHeight + 200
}

onMounted(async () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  socket.emit('join', useStore.userInfo.username)
  friendUsername.value = route.query.toUsername as string
  friendName.value = route.query.friendName as string
  friendAvatar.value = route.query.friendAvatar as string
  // 获取历史聊天信息
  let res: msgDataAllRes = await getChatMsg({
    fromUsername: route.query.fromUsername as string,
    toUsername: route.query.toUsername as string
  })
  msgArr.value.push(...res.data.data)
  nextTick(() => {
    reachBottom()
  })
})
</script>
<style lang="scss" scoped>
.nav_header1 {
  background-color: #f5f5f5;
  height: 46px;
  overflow: hidden;
}
::v-deep(.van-nav-bar__left) {
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
.safe1 {
  width: 100%;
  height: 46px;
}
.chatArea {
  background-color: #f5f5f5;
  background-color: pink;
  width: 100%;
  height: calc(var(--vh) * 100 - 92px);
  padding: 0 12px;
  overflow: hidden;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
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
.safe2 {
  width: 100%;
  height: 46px;
}
.emoji-safeArea {
  width: 100%;
  height: 210px;
}
.fixed-bottom {
  width: 100%;
  height: 46px;
  background-color: #f5f5f5;
  overflow: hidden;
  .bottom-input {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    padding: 8px 0;
    .van-icon {
      font-size: 26px;
      margin-bottom: 3px;
    }
    .inp {
      width: 65%;
      padding: 4px 6px;
      border-radius: 4px;
    }
    .send-btn {
      padding: 0;
      background-color: #388aef;
      color: #ffffff;
      width: 44px;
      height: 27px;
      margin-bottom: 2px;
      border-color: #388aef;
      margin-right: 2px;
      font-size: 12px;
    }
  }
  .bottom-emoji {
    width: 100%;
    height: 210px;
    background-color: #e8eaec;
    font-size: 22px;
    padding: 5px 10px;
    .bottom-emoji-line {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 10px;
    }
  }
}
</style>
