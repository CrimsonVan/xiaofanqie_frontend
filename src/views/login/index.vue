<template>
  <div class="login">
    <div class="login-top">
      <van-icon @click="() => router.back()" name="cross" />
      <p class="help">帮助</p>
    </div>
    <!-- 登录表单 -->
    <van-form style="padding: 0" v-if="isLogin" @submit="onSubmit">
      <div class="login-title"><h4>密码登录</h4></div>
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="用户名"
          placeholder="手机号"
          :rules="[{ validator, message: '请输入正确手机号格式' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          placeholder="输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div class="form-info"><span @click="changeForm">← 返回</span><span>忘记密码？</span></div>
      <div>
        <van-button :disabled="isEmpty" class="login-btn" round block native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- 注册表单 -->
    <van-form v-else @submit="onSubmit2">
      <div class="login-title"><h4>用户注册</h4></div>
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="用户名"
          placeholder="手机号"
          :rules="[{ validator, message: '请输入正确手机号格式' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          placeholder="输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div class="form-info"><span @click="changeForm">← 返回</span><span>欢迎来小红书</span></div>
      <div>
        <van-button :disabled="isEmpty" class="login-btn" round block native-type="submit"
          >注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { userLoginService, userRegisterService } from '@/api/user'
import { useNumStore } from '@/stores'
import { showFailToast, showSuccessToast } from 'vant'
const useStore = useNumStore()
const username = ref('13114209341')
const password = ref('123456')
const isLogin = ref(true)
import { useRouter } from 'vue-router'
const changeForm = () => {
  isLogin.value = !isLogin.value
}
const router = useRouter()
const onSubmit = async () => {
  let res = await userLoginService({
    username: username.value,
    password: password.value
  })
  console.log('打印登录接口返回结果', res)
  useStore.setToken(res.data.token)
  await useStore.getUserInfo(username.value)
  await useStore.getFollows()
  if (res.data.code === 0) {
    router.push('/home')
    console.log('登陆成功并且跳转')
  } else {
    console.log('登陆失败')
  }
}
const onSubmit2 = async () => {
  let res = await userRegisterService({ username: username.value, password: password.value })
  console.log('打印注册的res', res.data.data)
  if (res.data.message === '用户名已被占用') {
    console.log('用户名已被占用')
    showFailToast('用户名已被占用')
  } else {
    showSuccessToast('注册成功')
    // console.log()
    changeForm()
  }
}
const isEmpty = computed(() => username.value === '' || password.value === '')
const validator = (val: string) => /^1\d{10}$/.test(val)
</script>
<style lang="scss" scoped>
.login {
  padding: 20px 20px;

  .login-top {
    // background-color: salmon;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .help {
      font-size: 15px;
      color: #6e6e6e;
    }
  }
  .login-title {
    width: 100%;
    // background-color: sandybrown;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    color: black;
    margin-bottom: 14px;
    margin-top: 14px;
  }
  .login-btn {
    height: 38px;
    width: 280px;
    margin: 15px auto;
    color: #ffffff;
    border-color: var(--theme-color);
    background-color: var(--theme-color);
  }
  .form-info {
    margin: 10px auto;
    width: 80%;
    font-size: 11px;
    color: #388aef;
    display: flex;
    justify-content: space-between;
  }
}
</style>
