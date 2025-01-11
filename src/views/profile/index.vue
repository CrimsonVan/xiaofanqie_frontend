<template>
  <van-nav-bar title="编辑资料" :fixed="true">
    <template #left>
      <van-icon name="arrow-left" @click="() => router.back()" />
    </template>
  </van-nav-bar>
  <div class="safeTop"></div>
  <!-- 头像 -->
  <div class="editAvatar">
    <van-uploader :after-read="afterRead">
      <img class="img" :src="useStore.userInfo.avatar" alt="" />
      <div class="btn">+</div>
    </van-uploader>
  </div>
  <!-- 名字 -->
  <div class="edit-item">
    <div class="title">名字</div>
    <div class="content">{{ useStore.userInfo.nick_name }}</div>
    <van-icon name="arrow" @click="goChangeProfile('名字')" />
  </div>
  <div class="edit-item">
    <div class="title">小番茄号</div>
    <div class="content">xhs{{ useStore.userInfo.username }}</div>
    <van-icon name="arrow" />
  </div>
  <div class="edit-item">
    <div class="title">简介</div>
    <div class="content">{{ useStore.userInfo.signature }}</div>
    <van-icon name="arrow" @click="goChangeProfile('签名')" />
  </div>
  <div class="edit-item">
    <div class="title">性别</div>
    <div class="content">男</div>
    <van-icon name="arrow" />
  </div>
  <div class="edit-item">
    <div class="title">学校</div>
    <div class="content">桃花镇男子职业技术学校</div>
    <van-icon name="arrow" />
  </div>
  <div class="edit-item">
    <div class="title">生日</div>
    <div class="content">{{ useStore.userInfo.birthday }}</div>
    <van-icon name="arrow" @click="goChangeProfile('生日')" />
  </div>
  <div class="edit-item">
    <div class="title">职业</div>
    <div class="content">程序员</div>
    <van-icon name="arrow" />
  </div>
  <div class="edit-item">
    <div class="title">地区</div>
    <div class="content">中国-辽宁-白塔区</div>
    <van-icon name="arrow" />
  </div>
  <!-- 子组件 -->
  <profileEdit ref="profileEditRef"></profileEdit>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useNumStore } from '@/stores'
import { useRouter } from 'vue-router'
import { compressFile } from '@/utils/compress'
import profileEdit from './component/profileEdit.vue'
import { userUpdateAvatarService } from '@/api/user'
const useStore = useNumStore()
const router = useRouter()
const profileEditRef = ref<any>(null) //子组件dom
let formData = new FormData()
//上传头像
const afterRead = async (file: any) => {
  let res1 = await compressFile(file.file)
  formData.append('username', useStore.userInfo.username)
  formData.append('avatar', res1 as any)
  await userUpdateAvatarService(formData)
  useStore.getUserInfo(useStore.userInfo.username)
}
// 打开子组件
const goChangeProfile = (type: string) => {
  profileEditRef.value.openEditProfile(type)
}
</script>
<style lang="scss" scoped>
::v-deep(.van-nav-bar__left) {
  padding: 0 2px;
  font-size: 20px;
}
.safeTop {
  width: 100%;
  background-color: #ffffff;
  height: 46px;
}
.editAvatar {
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  //   background-color: salmon;
  .van-uploader {
    position: relative;
    .btn {
      position: absolute;
      bottom: 6px;
      right: 4px;
      font-size: 14px;
      overflow: hidden;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      background-color: #6e6e6e;
      color: #ffffff;
    }
    .img {
      width: 80px;
      height: 80px;
      overflow: hidden;
      border-radius: 50%;
      position: relative;
    }
  }
}
.edit-item {
  width: 94%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ede8e8;
  padding-bottom: 16px;
  margin: 14px auto;
  .title {
    color: #6e6e6e;
    font-size: 15px;
  }
  .content {
    color: #333333;
    font-size: 15px;

    margin-left: auto;
  }
  .van-icon-arrow {
    margin-left: 2px;
    color: #ccc;
    font-size: 15px;
    margin-top: 1px;
  }
}
</style>
