<template>
  <van-nav-bar :fixed="true" @click-left="onClickLeft">
    <template #left>
      <van-icon name="arrow-left" />
      <img class="nav-avatar" :src="detailInfo.url" alt="" />
      <span class="nav-name">小猫吃鱼</span>
    </template>
    <template #right>
      <van-button class="nav-btn" plain color="#ff1e42">关注</van-button>
      <van-icon name="share-o" />
    </template>
  </van-nav-bar>
  <div class="safeBottom"></div>
  <van-swipe :autoplay="3000" indicator-color="#ff1e42">
    <van-swipe-item v-for="item in 4" :key="item">
      <img style="width: 100%" :src="detailInfo.url"
    /></van-swipe-item>
  </van-swipe>
  <div class="detail-main">
    <h4>人在极端无语真的会被气笑</h4>
    <div class="detail-main-content">
      我们的颜色选择器工具是一个强大的在线工具，允许您从任何图像中选择颜色。选择图像后，您可以使用放大镜放大并选择单个像素，以实时预览其颜色。
      我们的工具使用户能够从图像...
    </div>
    <div class="detail-main-data">10-26 广东</div>
  </div>
  <div class="comment-num">共 307 条评论</div>
  <div class="comment-main">
    <commentPart />
    <commentPart />
    <commentPart />
    <commentPart />
    <commentPart />
  </div>
  <div class="bottom-input">
    <van-field
      left-icon="edit"
      v-model="message"
      rows="1"
      autosize
      class="inp"
      type="textarea"
      placeholder="说点什么..."
    />
    <van-icon name="like-o" />
    <van-icon name="star-o" />
    <van-icon name="chat-o" />
  </div>
  <div class="safeBottom"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import commentPart from './components/commentPart.vue'
const router = useRouter()
const message = ref('')
const route = useRoute()
const detailInfo = ref<any>({
  url: ''
})
const onClickLeft = () => {
  router.push('/home')
}
onMounted(() => {
  console.log('测试query', route.query.picurl)
  detailInfo.value.url = route.query.picurl
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
