<template>
  <van-nav-bar :fixed="true">
    <template #left>
      <van-icon @click="() => router.back()" name="arrow-left" />
      <img
        @click="goOther(detailInfo?.username!)"
        class="nav-avatar"
        :src="detailInfo?.avatar"
        alt=""
      />
      <span class="nav-name">{{ detailInfo?.nick_name }}</span>
    </template>
    <template #right>
      <followButton :isOther="false" :detailInfo="detailInfo"></followButton>
      <van-icon v-if="useStore.userInfo.username !== detailInfo?.username" name="share-o" />
      <van-icon v-else @click="() => (showBottom = true)" name="ellipsis" />
    </template>
  </van-nav-bar>
  <div class="safeBottom"></div>

  <van-swipe :height="swipeHeight">
    <van-swipe-item v-for="(item, index) in detailInfo?.content_img.split(',')" :key="index">
      <van-image width="100%" :height="swipeHeight" fit="contain" :src="item" />
    </van-swipe-item>
    <template #indicator="{ active, total }">
      <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
    </template>
  </van-swipe>

  <div v-if="isImgLoadingEnd" class="detail-main">
    <h4>{{ detailInfo?.title }}</h4>
    <div class="detail-main-content">
      {{ detailInfo?.content }}
    </div>
    <div class="detail-main-data">{{ detailInfo?.pub_time }} 广东</div>
  </div>
  <div v-if="isImgLoadingEnd" class="comment-num">共 {{ detailInfo?.comment_count }} 条评论</div>
  <div v-if="isImgLoadingEnd" class="comment-main">
    <commentPart
      :ref="
        (e: any) => {
          if (e) commentReplyRef.push(e)
        }
      "
      v-for="(item, index) in commentFirstArr"
      :key="item.comment_id"
      :commentInfo="item"
      @sendInfo="(val: commentsSonToFather) => getChildMsg(val, index)"
    ></commentPart>
  </div>
  <div class="bottom-input">
    <van-field
      ref="inpRef"
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
  <!-- 底侧弹出 -->
  <van-popup v-model:show="showBottom" position="bottom" :style="{ width: '100%', height: '14%' }">
    <div class="bottom-pop">
      <div class="bottom-pop-item">
        <div class="circle"><van-icon name="share-o" /></div>
        <div class="bottom-pop-text">分享</div>
      </div>
      <div class="bottom-pop-item">
        <div class="circle"><van-icon name="miniprogram-o" /></div>
        <div class="bottom-pop-text">生成图片</div>
      </div>
      <div class="bottom-pop-item">
        <div class="circle"><van-icon name="flower-o" /></div>
        <div class="bottom-pop-text">推广</div>
      </div>
      <div class="bottom-pop-item">
        <div class="circle"><van-icon name="edit" /></div>
        <div class="bottom-pop-text">编辑</div>
      </div>
      <div class="bottom-pop-item" @click="delPost">
        <div class="circle"><van-icon name="delete-o" /></div>
        <div class="bottom-pop-text">删除</div>
      </div>
    </div>
  </van-popup>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getSinglePostService, delPostService } from '@/api/post'
import { getCommentService, addCommentService } from '@/api/comments'
import { useRouter, useRoute } from 'vue-router'
import commentPart from './components/commentPart.vue'
import { useNumStore } from '@/stores'
import followButton from '@/components/followButton.vue'
import type { commentData, commentsSonToFather, commentDataAllRes } from '@/type/comments'
import type { postOneDataRes, postData } from '@/type/post'
import { showConfirmDialog } from 'vant'
const useStore = useNumStore()
const router = useRouter()
const message = ref('')
const route = useRoute()
const detailInfo = ref<postData>()
const commentFirstArr = ref<commentData[]>([]) //一级评论列表
const atContent = ref<string>('请输入消息')
const commentReplyRef = ref<any>([])
const swipeHeight = ref<any>()
const curIndex = ref<number>(0)
const showBottom = ref<boolean>(false)
const isImgLoadingEnd = ref<boolean>(false)
const inpRef = ref<any>()
let msgObj = ref({
  avatar: useStore.userInfo.avatar,
  content: '',
  nick_name: useStore.userInfo.nick_name,
  parent_comment_id: 0, //2级 3级
  post_id: route.query.id as string,
  reply_comment_id: 0, //3级
  reply_nickname: '0', //3级
  reply_username: '0', //3级
  username: useStore.userInfo.username,
  father_length: 0
}) //发送信息

const goOther = (username: string) => {
  if (username === useStore.userInfo.username) {
    router.push('/myself')
  } else {
    router.push(`/other?username=${username}`)
  }
}
const getChildMsg = (val: commentsSonToFather, index: number) => {
  // console.log('打印index', index)
  console.log('打印inp的dom', inpRef.value.focus())
  curIndex.value = index
  // console.log('打印子传父亲', val)
  atContent.value = `回复 @${val.reply_nickname}:`
  msgObj.value.parent_comment_id = val.parent_comment_id
  msgObj.value.father_length = val.father_length
  if (val.reply_comment_id) {
    // console.log('真的三级评论')
    msgObj.value.reply_comment_id = val.reply_comment_id
    msgObj.value.reply_nickname = val.reply_nickname
    msgObj.value.reply_username = val.reply_username as string
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
  let res: any = await addCommentService(msgObj.value)
  message.value = ''
  if (res.data.message === '新增评论成功') {
    console.log('新增评论成功')
    detailInfo.value!.comment_count++
    if (atContent.value === '请输入消息') {
      let res1 = await getCommentService({ id: route.query.id as string })
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
const delPost = () => {
  showConfirmDialog({
    message: '确定要删除这个帖子吗？'
  })
    .then(async () => {
      await delPostService({ id: route.query.id as string })
      router.back()
    })
    .catch(() => {
      // on cancel
    })
}

onMounted(async () => {
  console.log('打印route', typeof route.query.id)
  let res: postOneDataRes = await getSinglePostService({ id: route.query.id as string })
  detailInfo.value = res.data.data
  console.log('打印res.data.data', res.data.data)
  let res1: commentDataAllRes = await getCommentService({ id: route.query.id as string })
  console.log('打印帖子下面的评论', res1.data.data)
  commentFirstArr.value = res1.data.data
  console.log('dom', document.querySelector('.van-image__img')?.clientHeight)
  let firstImgHeight: any = document.querySelector('.van-image__img')?.clientHeight
  if (firstImgHeight < 550) {
    swipeHeight.value = document.querySelector('.van-image__img')?.clientHeight
  } else {
    swipeHeight.value = 500
  }
  isImgLoadingEnd.value = true
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
  margin-left: 6px;
}
.nav-name {
  margin-left: 5px;
  font-size: 12px;
  color: #333333;
}
.nav-btn {
  border-radius: 12px;
  height: 24px;
  min-width: 52px;
  margin-right: 8px;
  font-size: 12px;
  padding: 3px;
  color: #ff1e42;
  border-color: #ff1e42;
}
.nav-btn-followed {
  border-radius: 12px;
  height: 24px;
  min-width: 52px;
  margin-right: 8px;
  font-size: 12px;
  padding: 3px;
  color: #333333;
  border-color: #ccc;
}
.van-swipe {
  width: 100%;
  // height: 100%;
  // height: 390px;
  .van-swipe-item {
    width: 100%;

    img {
      width: 100%;
      // // width: auto;
      // height: 100%;
      // object-fit: contain;
    }
  }
  .custom-indicator {
    position: absolute;
    right: 10px;
    top: 4px;
    padding: 1px 4.5px;
    font-size: 14px;
    border-radius: 9px;
    color: #f5f5f5;
    background: rgba(0, 0, 0, 0.4);
  }
  ::v-deep(.van-swipe__indicator--active) {
    background-color: var(--theme-color);
  }
}
.van-safe-area-bottom {
  border-top: 1px solid #ccc;
}
.detail-main {
  padding: 10px 0px 15px;
  margin: 0px 10px;
  min-height: 2vh;
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
.van-popup--bottom {
  border-radius: 12px 12px 0 0;

  .bottom-pop {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-around;
    .bottom-pop-item {
      height: 100%;
      width: 50px;
      // background-color: palegoldenrod;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .circle {
        width: 48px;
        height: 48px;
        overflow: hidden;
        border-radius: 50%;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        .van-icon {
          color: #8a8a8a;
          font-size: 27px;
        }
      }
      .bottom-pop-text {
        font-size: 12px;
        margin-top: 3px;
        color: #333333;
      }
    }
  }
}
</style>
