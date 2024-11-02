<template>
  <van-nav-bar style="background-color: #f5f5f5" :fixed="true" @click-left="onClickLeft">
    <template #left>
      <van-icon name="arrow-left" />
      <img
        class="nav-avatar"
        src="https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/s28447008.jpg"
        alt=""
      />
      <span class="nav-name">小猫吃鱼</span>
    </template>
    <template #right>
      <van-icon name="share-o" />
    </template>
  </van-nav-bar>
  <div class="chatArea">
    <!-- 本人信息 -->
    <div class="chat-msg-item-right">
      <div class="msg-item-content">你打算出iphone12吗</div>
      <img
        class="msg-item-avatar"
        src="https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/e69858186deb93429436ec0b194e3967_720.jpg"
        alt=""
      />
    </div>
    <!-- 对方回复 -->
    <div class="chat-msg-item-left">
      <img
        class="msg-item-avatar"
        src="https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/s28447008.jpg"
        alt=""
      />
      <div class="msg-item-content">
        哈哈还没考虑好价格哈哈哈如果需要在现有 Icon 的基础上使用更多图标，可以引入第三方 iconfont
        对应的字体文件和 CSS 文件，之后就可以在 Icon 组件中直接使用
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
    <van-icon name="smile-o" />
    <van-icon name="add-o" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const message = ref()
const onClickLeft = () => {
  router.push('/msg')
}
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
    // background-color: salmon;
    margin: 16px 0;
    display: flex;
    align-items: flex-start;
    .msg-item-avatar {
      width: 31px;
      height: 31px;
      border-radius: 50%;
      overflow: hidden;
    }
    .msg-item-content {
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
  }
  .chat-msg-item-right {
    width: 100%;
    min-height: 34px;
    margin: 16px 0;
    display: flex;
    align-items: flex-start;
    .msg-item-avatar {
      width: 31px;
      height: 31px;
      border-radius: 50%;
      overflow: hidden;
    }
    .msg-item-content {
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
