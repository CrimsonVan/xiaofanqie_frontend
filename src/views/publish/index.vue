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
  <div class="cate_add_select">
    <div v-if="selectedCate" class="cate_select" @click="delCate">
      {{ selectedCate?.cate_name }} X
    </div>
    <div v-if="!isEditCate" @click="addCate" class="cate_add">+标签</div>
    <van-field ref="add_inp_ref" v-else class="addcate_inp" v-model="addCateVal" @blur="addDone" />
  </div>
  <div class="cate_recommend">
    <div class="cate_recommend_title">推荐标签:</div>
    <div class="cate_recommend_area">
      <div
        @click="selectCate(item)"
        class="cate_recommend_item"
        v-for="(item, index) in cateList"
        :key="index"
      >
        {{ item.cate_name }}
      </div>
      <div class="cate_recommend_item" v-for="(item, index) in cateList" :key="index">
        {{ item.cate_name }}
      </div>
    </div>
  </div>
  <div class="bottom-input">
    <van-icon name="like-o" />
    <van-icon name="star-o" />
    <van-icon name="star-o" />
    <van-button :disabled="isEmpty" @click="pubPost" round class="btn">发布帖子</van-button>
  </div>
  <div class="safeBottom"></div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { addPostService } from '@/api/post'
import { getPostCateService, addPostCateService, getOnePostCateService } from '@/api/cate'
import { useRouter } from 'vue-router'
import { useNumStore } from '@/stores'
import { showToast } from 'vant'
import { getNowFormatDate } from '@/utils/data'
import { compressFile } from '@/utils/compress'
const useStore = useNumStore()
const router = useRouter()
const fileList = ref<any>([])
const cateList = ref<any>([])
const selectedCate = ref<any>()
const isEditCate = ref<any>(false)
const add_inp_ref = ref<any>(null)
const onOversize = () => {
  showToast({
    message: '文件大小不能超过 10mb',
    position: 'top'
  })
}
const addCateVal = ref<any>('')
//选择标签
const selectCate = (item: any) => {
  selectedCate.value = item
}
//删除标签
const delCate = () => {
  selectedCate.value = null
}
//点击添加标签
const addCate = () => {
  addCateVal.value = ''
  isEditCate.value = true
  nextTick(() => {
    add_inp_ref.value.focus()
  })
}
//发送标签添加请求
const addDone = async () => {
  isEditCate.value = false
  if (addCateVal.value === '' || addCateVal.value === null) {
    console.log('不能为空')
    return
  }

  console.log('打印新增cate', addCateVal.value)
  await addPostCateService({
    cate_name: addCateVal.value,
    creater: useStore.userInfo.nick_name,
    creater_username: useStore.userInfo.username,
    creater_avatar: useStore.userInfo.avatar
  })
  let res = await getOnePostCateService({
    cate_name: addCateVal.value
  })
  console.log('获取新增的分类', res.data.data)
  cateList.value.unshift(res.data.data)
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
  console.log('打印压缩前file', file)
  // comPressImage()
  if (file instanceof Array) {
    console.log('多图片上传')
    file.forEach(async (item, index) => {
      let res = await compressFile(item.file)
      // console.log('打印压缩后的图片', res)
      fileList.value[index].file = res
    })
  } else {
    console.log('单图片上传')
    let res = await compressFile(file.file)
    console.log('打印压缩后file', res)
    fileList.value[fileList.value.length - 1].file = res
  }
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
  formData.append('cate_id', selectedCate.value.cate_id)
  formData.append('pub_time', getNowFormatDate())
  console.log('压缩后的fileList', fileList.value)

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
  let res = await getPostCateService({ pagenum: 1 })
  cateList.value = res.data.data
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
.cate_add_select {
  padding: 4px 12px;
  display: flex;
  .cate_select {
    color: #f2868b;
    background-color: #fbebe9;
    border: 1px solid #f2868b;
    font-size: 10px;
    min-width: 40px;
    height: 20px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 6px;
    padding: 0 6px;
  }
  .cate_add {
    background-color: #fcf3e1;
    color: #cea260;
    border: 1px solid #cea260;
    font-size: 10px;
    width: 40px;
    height: 20px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .addcate_inp {
    width: 50px;
    height: 20px;
    padding: 1px 2px;
    border: 1px solid #f2868b;
    border-radius: 4px;
  }
}
.cate_recommend {
  padding: 4px 12px;
  display: flex;
  font-size: 13px;
  color: #333333;
  font-weight: 600;
  .cate_recommend_title {
    width: 18%;
    // background-color: salmon;
  }
  .cate_recommend_area {
    width: 82%;
    overflow-x: scroll;
    white-space: nowrap;
    overflow-y: hidden;
    display: flex;
    &::-webkit-scrollbar {
      height: 0;
    }
    .cate_recommend_item {
      color: #f2868b;
      background-color: #fbebe9;
      border: 1px solid #f2868b;
      font-weight: 500;
      font-size: 10px;
      width: fit-content;
      padding: 0 6px;
      height: 20px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 6px;
    }
  }
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
