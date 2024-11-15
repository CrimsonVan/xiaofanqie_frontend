<template>
  <div class="comment-part">
    <img
      @click="goOther(commentInfo?.username as string)"
      class="comment-avatar"
      :src="commentInfo?.avatar"
      alt=""
    />
    <div class="comment-content">
      <div class="comment-content-top">{{ commentInfo?.nick_name }}</div>
      <div class="comment-content-middle">
        {{ commentInfo?.content }}
      </div>
      <div class="comment-content-data">
        昨天 07:06 云南 <span @click="sendFather(commentInfo as commentData, 1)">回复</span>
      </div>
    </div>
    <div class="comment-like">
      <van-icon name="like-o" />
      <div class="comment-like-num">67</div>
    </div>
  </div>
  <!-- 子评论显示区域 -->
  <div
    v-if="!isShowChild && (commentInfo?.child_length as number) > 0"
    @click="changeChildShow(commentInfo?.post_id as number, commentInfo?.comment_id as number)"
    class="reply-num"
  >
    <span style="color: #ccc">一</span> 展开{{ commentInfo?.child_length }}条回复
  </div>
  <div v-else class="reply">
    <div v-for="item in childArr" :key="item.comment_id" class="reply-part">
      <img class="reply-avatar" @click="goOther(item?.username)" :src="item?.avatar" alt="" />
      <div class="reply-content">
        <div class="reply-content-top">{{ item?.nick_name }}</div>
        <div class="reply-content-middle">
          <span style="color: #388aef" v-if="item?.reply_nickname !== '0'"
            >@{{ item?.reply_nickname }}:</span
          >{{ item?.content }}
        </div>
        <div class="reply-content-data">
          昨天 11:46 美国 <span @click="sendFather(item, 2)">回复</span>
        </div>
      </div>
      <div class="reply-like">
        <van-icon name="like-o" />
        <div class="reply-like-num">67</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { PropType } from 'vue'
import { getSecondCommentService } from '@/api/comments'
import type { commentData, commentDataAllRes, commentsSonToFather } from '@/type/comments'
import { useRouter } from 'vue-router'
import { useNumStore } from '@/stores'
const useStore = useNumStore()
const router = useRouter()
const isShowChild = ref<boolean>(false) //是否显示子评论
const childArr = ref<commentData[]>([]) //子评论

let props = defineProps({
  commentInfo: {
    type: Object as PropType<commentData>
  }
})

const goOther = (username: string) => {
  if (username === useStore.userInfo.username) {
    router.push('/myself')
  } else {
    router.push(`/other?username=${username}`)
  }
}
const changeChildShow = async (post_id: number, parent_comment_id: number) => {
  isShowChild.value = true
  let childRes: commentDataAllRes = await getSecondCommentService({
    post_id: post_id,
    parent_comment_id: parent_comment_id
  })
  childArr.value = childRes.data.data
  console.log('打印子评论', childArr.value)
}

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'sendInfo', data: commentsSonToFather): void
}>()

const sendFather = (info: commentData, type: number) => {
  if (type === 1) {
    console.log('二级评论')
    emit('sendInfo', {
      parent_comment_id: info?.comment_id as number,
      reply_nickname: info?.nick_name,
      father_length: info?.child_length as number
    })
  } else {
    console.log('三级评论')
    emit('sendInfo', {
      parent_comment_id: info.parent_comment_id,
      reply_comment_id: info.comment_id,
      reply_username: info.username,
      reply_nickname: info.nick_name,
      father_length: props?.commentInfo?.child_length as number
    })
  }
}
defineExpose({
  changeChildShow
})
</script>
<style lang="scss" scoped>
.comment-part {
  //   background-color: palegoldenrod;
  margin-top: 14px;
  display: flex;
  &:nth-child(1) {
    margin-top: 0;
  }
  //   justify-content: space-between;
  .comment-avatar {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    overflow: hidden;
  }
  .comment-content {
    margin-left: 10px;
    width: 78%;
    font-size: 14px;
    color: black;
    .comment-content-top {
      font-size: 12px;
      color: #8a8a8a;
      margin-bottom: 2px;
    }
    .comment-content-data {
      margin-top: 2px;
      font-size: 11px;
      color: #ccc;
      color: #8a8a8a;
    }
  }
  .comment-like {
    margin-left: auto;
    margin-right: 0;
    width: 20px;
    // background-color: slateblue;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #8a8a8a;

    .van-icon {
      //   color: aqua;
      font-size: 18px;
    }
    .comment-like-num {
      //   color: #6e6e6e;
      font-size: 12px;
      margin-top: 2px;
    }
  }
}
.reply-num {
  margin-left: 36px;
  font-size: 12px;
  color: #388aef;
  margin-top: 3px;
}
.reply-part {
  display: flex;
  margin-top: 9px;
  margin-left: 36px;
  font-size: 14px;
  color: black;
  //   background-color: sandybrown;
  .reply-avatar {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    overflow: hidden;
  }
  .reply-content {
    margin-left: 5px;
    width: 78%;
    font-size: 14px;
    color: black;
    .reply-content-top {
      font-size: 11px;
      color: #8a8a8a;
      margin-bottom: 2px;
    }
    .reply-content-data {
      margin-top: 4px;
      font-size: 11px;
      color: #ccc;
      color: #8a8a8a;
    }
  }
  .reply-like {
    margin-left: auto;
    margin-right: 0;
    width: 20px;
    // background-color: slateblue;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #8a8a8a;

    .van-icon {
      //   color: aqua;
      font-size: 18px;
    }
    .reply-like-num {
      //   color: #6e6e6e;
      font-size: 12px;
      margin-top: 2px;
    }
  }
}
</style>
