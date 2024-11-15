<template>
  <div class="nav-top">
    <van-icon @click="goback" name="arrow-left" />
  </div>
  <div class="safetop"></div>
  <div>
    <van-uploader
      class="upload"
      v-model="fileList"
      :max-size="10000 * 1024"
      multiple
      :max-count="9"
      :after-read="afterRead"
      @oversize="onOversize"
    />
  </div>

  <van-field
    class="field"
    v-model="title"
    rows="1"
    autosize
    placeholder="添加标题"
    maxlength="20"
  />
  <van-field
    v-model="message"
    rows="9"
    autosize
    type="textarea"
    maxlength="200"
    placeholder="请添加正文"
  />
  <div class="bottom-input">
    <van-icon name="like-o" />
    <van-icon name="star-o" />
    <van-icon name="star-o" />
    <van-button :disabled="isEmpty" @click="pubPost" round class="btn">发布帖子</van-button>
  </div>
  <div class="safeBottom"></div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { addPostService } from '@/api/post'
import { useRouter } from 'vue-router'
import { useNumStore } from '@/stores'
import { showToast } from 'vant'
import { getNowFormatDate } from '@/utils/data'
import { compressFile } from '@/utils/compress'
const useStore = useNumStore()
const router = useRouter()
const fileList = ref<any>([])
const onOversize = () => {
  showToast({
    message: '文件大小不能超过 10mb',
    position: 'top'
  })
}
// 创建一个空对象实例
let formData = new FormData()
const goback = () => {
  router.back()
  if (fileList.value.length === 0) {
    console.log('图片不能为空')
    return
  } else {
    console.log('打印filelist', fileList.value[0].file)
  }
}
const message = ref('')
const title = ref('')
//照片上传事件方法
const afterRead = async (file: any) => {
  // 调用append()方法添加数据
  console.log('打印压缩前file', file.file)
  // comPressImage()
  let res = await compressFile(file.file)
  console.log('打印压缩后file', res)
  console.log('打印压缩前的fileList', fileList.value)
  fileList.value[fileList.value.length - 1].file = res
  console.log('打印压缩后的fileList', fileList.value)
}
const isEmpty = computed(
  () => title.value === '' || message.value === '' || fileList.value.length === 0
)
const pubPost = async () => {
  formData.append('title', title.value)
  formData.append('content', message.value)
  formData.append('username', useStore.userInfo.username)
  formData.append('nick_name', useStore.userInfo.nick_name)
  formData.append('avatar', useStore.userInfo.avatar)
  formData.append('pub_time', getNowFormatDate())
  fileList.value.forEach((item: any) => {
    formData.append('cover_img', item.file)
  })
  let res: any = await addPostService(formData)
  if (res.data.message === '新增帖子成功') {
    console.log('打印上传', res.data)
    router.push('/home')
  }
}
onMounted(async () => {
  // let res = await axios.get('https://www.cloudflare.com/cdn-cgi/trace')
  // let ip = res.data.trim().split('\n')[2].replace('ip=', '')
  // console.log('ip地址为', ip, typeof ip)
  let arr = ['1', '2']
  console.log('arr的string化', typeof arr.toString())
})
</script>
<style lang="scss" scoped>
.nav-top {
  display: flex;
  position: fixed;
  z-index: 990;
  top: 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  padding: 8px 0;
  background-color: transparent;

  .van-icon-arrow-left {
    margin-left: 4px;
  }
}
.safetop {
  height: 40px;
  //   background-color: salmon;
}
.upload {
  margin: 0 14px;
}
.field {
  width: 92%;
  border-bottom: 1px solid #ede8e8;
  margin: 0 auto;
  padding: 5px 0px;
  color: aqua;
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
    font-size: 24px;
  }
  .btn {
    width: 70%;
    height: 36px;
    font-size: 16px;
    color: #ffffff;
    border-color: var(--theme-color);
    background-color: var(--theme-color);
  }
}
</style>
