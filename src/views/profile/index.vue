<template>
  <van-nav-bar title="编辑资料" :fixed="true">
    <template #left>
      <van-icon name="arrow-left" @click="goback" />
    </template>
  </van-nav-bar>
  <div class="safeTop"></div>
  <div class="editAvatar">
    <van-uploader :after-read="afterRead">
      <img class="img" :src="useStore.userInfo.avatar" alt="" />
      <div class="btn">+</div>
    </van-uploader>
  </div>
  <div class="edit-item">
    <div class="title">名字</div>
    <div class="content">{{ useStore.userInfo.nick_name }}</div>
    <van-icon name="arrow" @click="goChange('名字')" />
  </div>
  <div class="edit-item">
    <div class="title">小红书号</div>
    <div class="content">xhs{{ useStore.userInfo.username }}</div>
    <van-icon name="arrow" />
  </div>
  <div class="edit-item">
    <div class="title">简介</div>
    <div class="content">{{ useStore.userInfo.signature }}</div>
    <van-icon name="arrow" @click="goChange('签名')" />
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
    <van-icon name="arrow" @click="goChange('生日')" />
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
  <van-popup class="popup" v-model:show="showText" position="bottom">
    <div class="textTop">
      <span @click="() => (showText = false)">取消</span>
      <span>编辑{{ hearderText }}</span>
      <span @click="changeProfile" class="save-text">保存</span>
    </div>
    <div class="edit-inp">
      <van-field
        v-if="hearderText === '签名' || hearderText === '名字'"
        v-model="title"
        rows="1"
        autosize
        maxlength="14"
        type="textarea"
        :placeholder="placeholderText"
        class="nickname_inp"
      />
      <div v-if="hearderText === '生日'" class="selectBirth">
        <span class="birth1">生日信息</span><span class="birth2">{{ birthDate }}</span>
        <van-icon @click="() => (isShowBirth = true)" name="arrow" />
      </div>
      <div class="warning">
        {{ warnText }}
      </div>
      <van-date-picker
        v-if="isShowBirth && hearderText === '生日'"
        v-model="currentDate"
        title="选择日期"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmBirth"
      />
    </div>
  </van-popup>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useNumStore } from '@/stores'
import { useRouter } from 'vue-router'
import { compressFile } from '@/utils/compress'
import {
  userUpdateAvatarService,
  userUpdateNicknameService,
  userUpdateSignatureService,
  userUpdateBirthdayService
} from '@/api/user'
const useStore = useNumStore()
const currentDate = ref(['2021', '01', '01'])
const minDate = new Date(1970, 1, 1)
const maxDate = new Date(2024, 1, 1)
const birthDate = ref(useStore.userInfo.birthday)
const confirmBirth = (date: any) => {
  isShowBirth.value = false
  birthDate.value = date.selectedValues.join('-')
}
const isShowBirth = ref(false)
const router = useRouter()
const goback = () => {
  router.back()
}
const hearderText = ref('')

const showText = ref(false)
const title = ref('')
const placeholderText = ref('')
// 创建一个空对象实例
let formData = new FormData()
const afterRead = async (file: any) => {
  console.log('打印file', file.file)
  let res1 = await compressFile(file.file)
  console.log('打印压缩后file', res1)
  formData.append('username', useStore.userInfo.username)
  formData.append('avatar', res1 as any)
  let res = await userUpdateAvatarService(formData)
  console.log('打印更新头像', res.data)
  await useStore.getUserInfo(useStore.userInfo.username)
}

const fileList = ref([])
console.log(fileList.value)
const goChange = (type: string) => {
  if (type === '名字') {
    hearderText.value = '名字'
    title.value = useStore.userInfo.nick_name
    placeholderText.value = '请添加一个名字'
  }
  if (type === '签名') {
    hearderText.value = '签名'
    title.value = useStore.userInfo.signature
    placeholderText.value = '请添加一个签名'
  }
  if (type === '生日') {
    hearderText.value = '生日'
    title.value = useStore.userInfo.signature
    placeholderText.value = '请添加一个生日'
  }
  showText.value = true
}
const warnText = ref('')
const changeProfile = async () => {
  if (hearderText.value === '名字') {
    if (title.value === '') {
      warnText.value = '不能为空'
      return
    }
    if (title.value === useStore.userInfo.nick_name) {
      warnText.value = '不能和原来名字相同'
      return
    }
    let res: any = await userUpdateNicknameService({
      nickname: title.value,
      username: useStore.userInfo.username
    })
    console.log('打印更新昵称', res.data)
    await useStore.getUserInfo(useStore.userInfo.username)
    showText.value = false
  }

  if (hearderText.value === '签名') {
    if (title.value === '') {
      warnText.value = '不能为空'
      return
    }
    if (title.value === useStore.userInfo.signature) {
      warnText.value = '不能和原来签名相同'
      return
    }
    let res: any = await userUpdateSignatureService({
      signature: title.value,
      username: useStore.userInfo.username
    })
    console.log('打印更新签名', res.data)
    await useStore.getUserInfo(useStore.userInfo.username)
    showText.value = false
  }
  if (hearderText.value === '生日') {
    if (birthDate.value === useStore.userInfo.birthday) {
      warnText.value = '不能和原来生日相同'
      console.log('不能和原来生日相同')

      return
    }
    let res: any = await userUpdateBirthdayService({
      birthday: birthDate.value,
      username: useStore.userInfo.username
    })
    console.log('打印更新生日', res.data)
    await useStore.getUserInfo(useStore.userInfo.username)
    showText.value = false
  }
}
watch(
  () => title.value,
  (newVal) => {
    // console.log('打印watch', newVal)
    if (newVal === '') {
      warnText.value = '不能为空'
    } else {
      warnText.value = ''
    }
  }
)
</script>
<style lang="scss" scoped>
::v-deep(.van-nav-bar__left) {
  //   background-color: saddlebrown;
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
.popup {
  background-color: #f5f5f5;
  font-size: 17px;
  color: #333333;
  height: 100vh;
  padding: 10px;
  .textTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 15px;
    .save-text {
      color: var(--theme-color);
    }
  }
  .edit-inp {
    margin-top: 24px;
    width: 100%;
    // background-color: salmon;
    .nickname_inp {
      border-radius: 16px;
      overflow: hidden;
    }
    .warning {
      width: 100%;
      font-size: 12px;
      color: red;
      padding: 2px 14px;
      margin-bottom: 10px;
    }
    .selectBirth {
      width: 100%;
      height: 44px;
      border-radius: 14px;
      font-size: 14px;
      display: flex;
      align-items: center;
      background-color: #ffffff;
      padding: 0 13px;
      margin-bottom: 2px;
      .birth1 {
        margin-left: 0px;
      }
      .birth2 {
        margin-left: auto;

        color: black;
      }
      .van-icon-arrow {
        margin-left: 4px;
        margin-right: 0;
      }
    }
  }
}
</style>
