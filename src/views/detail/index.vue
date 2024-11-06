<template>
  <van-nav-bar :fixed="true">
    <template #left>
      <van-icon @click="onClickLeft" name="arrow-left" />
      <img
        @click="goOther(detailInfo?.username)"
        class="nav-avatar"
        :src="detailInfo?.avatar"
        alt=""
      />
      <span class="nav-name">{{ detailInfo?.nick_name }}</span>
    </template>
    <template #right>
      <van-button class="nav-btn" plain color="#ff1e42">关注</van-button>
      <van-icon name="share-o" />
    </template>
  </van-nav-bar>
  <div class="safeBottom"></div>
  <van-swipe :autoplay="3000" indicator-color="#ff1e42">
    <van-swipe-item v-for="item in 4" :key="item">
      <img style="width: 100%" :src="detailInfo?.content_img"
    /></van-swipe-item>
  </van-swipe>
  <div class="detail-main">
    <h4>{{ detailInfo?.title }}</h4>
    <div class="detail-main-content">
      {{ detailInfo?.content }}
    </div>
    <div class="detail-main-data">{{ detailInfo?.pub_time }} 广东</div>
  </div>
  <div class="comment-num">共 {{ detailInfo?.comments_length }} 条评论</div>
  <div class="comment-main">
    <commentPart
      :ref="
        (e: any) => {
          if (e) commentReplyRef.push(e)
        }
      "
      v-for="(item, index) in commentFirstArr"
      :key="item.comment_id"
      :commentInfo="item"
      @sendInfo="(val) => getChildMsg(val, index)"
    />
  </div>
  <div class="bottom-input">
    <van-field
      left-icon="edit"
      v-model="message"
      rows="1"
      autosize
      class="inp"
      type="textarea"
      :placeholder="atContent"
    />
    <van-icon name="like-o" />
    <van-icon name="star-o" />
    <van-icon @click="sendMsg" name="chat-o" />
  </div>
  <div class="safeBottom"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getSinglePostService } from '@/api/post'
import { getCommentService, addCommentService } from '@/api/comments'
import { useRouter, useRoute } from 'vue-router'
import commentPart from './components/commentPart.vue'
import { useNumStore } from '@/stores'
const useStore = useNumStore()
const router = useRouter()
const message = ref('')
const route = useRoute()
const detailInfo = ref<any>()
const commentFirstArr = ref() //一级评论列表
const atContent = ref('请输入消息')
const commentReplyRef = ref<any>([])
const curIndex = ref(0)
let msgObj = ref({
  avatar: useStore.userInfo.avatar,
  content: '',
  nick_name: useStore.userInfo.nick_name,
  parent_comment_id: 0, //2级 3级
  post_id: route.query.id,
  reply_comment_id: 0, //3级
  reply_nickname: '0', //3级
  reply_username: '0', //3级
  username: useStore.userInfo.username,
  father_length: 0
})
const onClickLeft = () => {
  router.push('/home')
}
const goOther = (username: string) => {
  if (username === useStore.userInfo.username) {
    router.push('/myself')
  } else {
    router.push(`/other?username=${username}`)
  }
}
const getChildMsg = (val: any, index: any) => {
  console.log('打印index', index)
  curIndex.value = index
  console.log('打印子传父亲', val)
  atContent.value = `回复给${val.reply_nickname}:`
  msgObj.value.parent_comment_id = val.parent_comment_id
  msgObj.value.father_length = val.father_length
  if (val.reply_comment_id) {
    console.log('真的三级评论')
    msgObj.value.reply_comment_id = val.reply_comment_id
    msgObj.value.reply_nickname = val.reply_nickname
    msgObj.value.reply_username = val.reply_username
  }
}
const sendMsg = async () => {
  // 判断输入能容是否为空
  if (message.value === '') {
    console.log('发送消息不能为空')
    return
  }
  // console.log('打印发送信息', message.value)
  msgObj.value.content = message.value
  let res = await addCommentService(msgObj.value)
  message.value = ''
  if (res.data.message === '新增评论成功') {
    console.log('新增评论成功')
    if (atContent.value === '请输入消息') {
      let res1 = await getCommentService({ id: route.query.id })
      commentFirstArr.value = res1.data.data
    } else {
      console.log('父亲传入儿子')
      commentReplyRef.value[curIndex.value]?.changeChildShow(
        route.query.id,
        msgObj.value.parent_comment_id
      )
    }
  }
}
onMounted(async () => {
  let res = await getSinglePostService({ id: route.query.id })
  detailInfo.value = res.data.data
  let res1 = await getCommentService({ id: route.query.id })
  console.log('打印帖子下面的评论', res1.data.data)
  commentFirstArr.value = res1.data.data
})
</script>
<style lang="scss" scoped>
.safeBottom {
  width: 100%;
  background-color: #ffffff;
  height: 46px;
}
::v-deep(.van-nav-bar__left) {
  //   background-color: saddlebrown;
  padding: 0 5px;
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
  border-radius: 12px;
  height: 23px;
  width: 52px;
  margin-right: 8px;
  font-size: 12px;
  padding: 0;
}
.van-swipe {
  width: 100%;
  overflow: hidden;
  .van-swipe-item {
    height: 100%;
    width: 100%;
  }
  .van-swipe__indicator {
    background-color: #8a8a8a;
  }
}
.van-safe-area-bottom {
  border-top: 1px solid #ccc;
}
.detail-main {
  padding: 10px 0px 15px;
  margin: 0px 10px;
  min-height: 16vh;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  h4 {
    margin-bottom: 6px;
  }
  .detail-main-content {
    font-size: 15px;
    color: #333333;
    color: black;
  }
  .detail-main-data {
    margin-top: 10px;
    font-size: 12px;
    color: #6e6e6e;
  }
}
.comment-num {
  padding: 8px 0px 8px;
  margin: 0px 10px;
  font-size: 10px;
  color: #6e6e6e;
  // background-color: salmon;
}
.comment-main {
  padding: 10px 0px 10px;
  margin: 0px 10px;
  // background-color: skyblue;
}
.bottom-input {
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
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
    width: 68%;
    padding: 4px 12px;
    border-radius: 14px;
    background-color: skyblue;
    background-color: #f5f5f5;
  }
}
</style>
