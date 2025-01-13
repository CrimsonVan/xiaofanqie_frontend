<template>
  <van-popup class="popup" v-model:show="showText" position="bottom">
    <!-- 头部操作栏 -->
    <div class="textTop">
      <span @click="() => (showText = false)">取消</span>
      <span>编辑{{ hearderText }}</span>
      <span @click="changeProfile" class="save-text">保存</span>
    </div>
    <!-- 输入框 or 选择框 -->
    <div class="edit-inp">
      <!-- 输入框 -->
      <van-field
        v-if="hearderText === '签名' || hearderText === '名字'"
        v-model="inpVal"
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
      <div v-if="hearderText === '性别'" class="selectGender">
        <div class="genderOption" @click="() => (curGender = '男')">
          <span>男</span><van-icon v-if="curGender === '男'" name="success" />
        </div>
        <div class="genderOption" @click="() => (curGender = '女')">
          <span>女</span><van-icon v-if="curGender === '女'" name="success" />
        </div>
      </div>
      <!-- 提示语 -->
      <div class="warning">
        {{ warnText }}
      </div>
      <!-- 日期选择框 -->
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
import {
  userUpdateNicknameService,
  userUpdateSignatureService,
  userUpdateBirthdayService,
  userUpdateGenderService
} from '@/api/user'
const useStore = useNumStore()
const minDate = new Date(1970, 1, 1)
const maxDate = new Date(2024, 1, 1)
const birthDate = ref(useStore.userInfo.birthday) //生日日期
const currentDate = ref(useStore.userInfo.birthday.split('-')) //选择器上的生日
const hearderText = ref<string>('') //编辑弹窗标题
const showText = ref<boolean>(false) //编辑弹框是否显示
const inpVal = ref<string>('') //输入框内容
const curGender = ref<string>(useStore.userInfo.gender) //当前性别
const placeholderText = ref<string>('') //placeholder文字
const warnText = ref<string>('') //提示词
const isShowBirth = ref(false) //是否选择生日日期

//开始编辑个人信息
const openEditProfile = (type: string) => {
  if (type === '名字') {
    inpVal.value = useStore.userInfo.nick_name
  } else if (type === '签名') {
    inpVal.value = useStore.userInfo.signature
  } else if (type === '生日') {
    inpVal.value = useStore.userInfo.signature
  } else if (type === '性别') {
    inpVal.value = useStore.userInfo.signature
  }
  hearderText.value = type
  placeholderText.value = `请添加一个${type}`
  showText.value = true
}
//修改个人信息
const changeProfile = async () => {
  if (hearderText.value === '名字') {
    if (inpVal.value === '') {
      warnText.value = '不能为空'
      return
    }
    if (inpVal.value === useStore.userInfo.nick_name) {
      warnText.value = '不能和原来名字相同'
      return
    }
    await userUpdateNicknameService({
      nickname: inpVal.value,
      username: useStore.userInfo.username
    })
  } else if (hearderText.value === '签名') {
    if (inpVal.value === '') {
      warnText.value = '不能为空'
      return
    }
    if (inpVal.value === useStore.userInfo.signature) {
      warnText.value = '不能和原来签名相同'
      return
    }
    await userUpdateSignatureService({
      signature: inpVal.value,
      username: useStore.userInfo.username
    })
  } else if (hearderText.value === '生日') {
    if (currentDate.value.join('-') === useStore.userInfo.birthday) {
      warnText.value = '不能和原来生日相同'
      return
    }
    await userUpdateBirthdayService({
      birthday: currentDate.value.join('-'),
      username: useStore.userInfo.username
    })
  } else if (hearderText.value === '性别') {
    if (curGender.value === useStore.userInfo.gender) {
      warnText.value = '不能和原来生日相同'
      return
    }
    await userUpdateGenderService({
      gender: curGender.value,
      username: useStore.userInfo.username
    })
  }
  //修改完更新个人信息
  useStore.getUserInfo(useStore.userInfo.username)
  showText.value = false
}
//选定生日日期
const confirmBirth = () => {
  isShowBirth.value = false
  birthDate.value = currentDate.value.join('-')
}
//暴露打开弹窗的方法
defineExpose({
  openEditProfile
})
watch(
  () => inpVal.value,
  (newVal) => {
    if (newVal === '') {
      warnText.value = '不能为空'
    } else {
      warnText.value = ''
    }
  }
)
</script>
<style lang="scss" scoped>
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
    .selectGender {
      width: 100%;
      height: 90px;
      border-radius: 14px;
      font-size: 14px;
      background-color: #ffffff;
      padding: 0 13px;
      margin-bottom: 5px;
      .genderOption {
        width: 100%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 15px;
        color: #333333;
        .van-icon-success {
          font-size: 20px;
          color: var(--theme-color);
        }
        &:first-child {
          border-bottom: 2px solid #f7f7f7;
        }
      }
    }
  }
}
</style>
