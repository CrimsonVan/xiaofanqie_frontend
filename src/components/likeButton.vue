<template>
  <van-icon class="like_btn" v-if="!isFollow" name="like-o" @click="followHandle" />
  <van-icon class="like_btn_active" v-else name="like" color="#ff1e42" @click="unfollowHandle" />
</template>
<script lang="ts" setup>
import { useNumStore } from '@/stores'
import { ref, onMounted } from 'vue'
const useStore = useNumStore()
const isFollow = ref<boolean>(false) //是否被关注

let props = defineProps({
  type: {
    type: String,
    default: 'post'
  },
  detailInfo: {
    type: Object
  }
})
const emit = defineEmits(['afterLike', 'afterCancelLike'])

//判断是否已经关注
const isFollowed = () => {
  if (props?.type === 'post') {
    let index = useStore.userInfo.likes.findIndex(
      (item: any) => item.like_id === props?.detailInfo?.id
    )
    return index === -1 ? (isFollow.value = false) : (isFollow.value = true)
  } else if (props?.type === 'comment') {
    let index = useStore.userInfo.comment_likes.findIndex(
      (item: any) => item.like_comment_id === props?.detailInfo?.comment_id
    )
    return index === -1 ? (isFollow.value = false) : (isFollow.value = true)
  }
}

//关注操作
const followHandle = async () => {
  isFollow.value = true
  if (props?.type === 'post') {
    emit('afterLike', props?.detailInfo?.id)
    await useStore.addLikes({
      username: useStore.userInfo.username,
      like_id: props?.detailInfo?.id
    })
  } else if (props?.type === 'comment') {
    emit('afterLike', props?.detailInfo?.comment_id)
    await useStore.addCommentLikes({
      username: useStore.userInfo.username,
      like_comment_id: props?.detailInfo?.comment_id
    })
  }
}

//取消关注操作
const unfollowHandle = async () => {
  isFollow.value = false
  if (props?.type === 'post') {
    emit('afterCancelLike', props?.detailInfo?.id)
    await useStore.delLikes({
      username: useStore.userInfo.username,
      like_id: props?.detailInfo?.id
    })
  } else if (props?.type === 'comment') {
    emit('afterCancelLike', props?.detailInfo?.comment_id)
    await useStore.delCommentLikes({
      username: useStore.userInfo.username,
      like_comment_id: props?.detailInfo?.comment_id
    })
  }
}

onMounted(() => {
  isFollowed()
})
</script>
<style lang="scss" scoped>
.like_btn {
  font-size: 26px;
}
.like_btn_active {
  font-size: 26px;
}
</style>
