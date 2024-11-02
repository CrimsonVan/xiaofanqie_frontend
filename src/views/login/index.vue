<template>
  <div class="login">
    <div class="login-top">
      <van-icon name="cross" />
      <p class="help">帮助</p>
    </div>
    <div class="login-title"><h4>密码登录</h4></div>
    <van-form @submit="onSubmit">
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
      <div class="form-info"><span>去注册</span><span>忘记密码？</span></div>
      <div>
        <van-button
          :disabled="isEmpty"
          class="login-btn"
          round
          block
          color="#ff1e42"
          native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
const username = ref('')
const password = ref('')
import { useRouter } from 'vue-router'
const router = useRouter()
const onSubmit = (values: any) => {
  console.log('submit', values)
  router.push('/home')
}
const isEmpty = computed(() => username.value === '' || password.value === '')
const validator = (val: string) => /1\d{10}/.test(val)
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
  }
  .form-info {
    margin: 10px auto;
    width: 80%;
    font-size: 10px;
    color: #388aef;
    display: flex;
    justify-content: space-between;
  }
}
</style>
