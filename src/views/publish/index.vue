<template>
  <!-- 顶部导航 -->
  <div class="nav-top">
    <van-icon @click="() => router.back()" name="arrow-left" />
  </div>
  <!-- 顶部安全区域 -->
  <div class="safetop"></div>
  <div>
    <!-- 头像上传 -->
    <van-uploader
      class="upload"
      v-model="fileList"
      :max-size="10000 * 1024"
      multiple
      :max-count="3"
      :after-read="afterRead"
      @oversize="onOversize"
    />
  </div>
  <!-- 标题输入栏 -->
  <van-field
    class="field"
    v-model="title"
    rows="1"
    autosize
    placeholder="添加标题"
    maxlength="20"
  />
  <!-- 贴文输入栏 -->
  <van-field
    v-model="message"
    rows="9"
    autosize
    type="textarea"
    maxlength="200"
    placeholder="请添加正文"
  />
  <!-- 分类 -->
  <div class="cate_add_select">
    <div v-if="selectedCate" class="cate_select" @click="delCate">
      {{ selectedCate?.cate_name }} X
    </div>
    <div v-if="!isAddCate" @click="startAddCate" class="cate_add">+标签</div>
    <van-field
      ref="add_inp_ref"
      v-if="isAddCate"
      class="addcate_inp"
      v-model="addCateVal"
      @blur="addCateHandle"
    />
  </div>
  <div class="cate_recommend">
    <div class="cate_recommend_title">推荐标签:</div>
    <div class="cate_recommend_area" ref="cate_recommend_area_dom">
      <div
        @click="selectCate(item)"
        class="cate_recommend_item"
        v-for="(item, index) in cateList"
        :key="index"
      >
        {{ item.cate_name }}
      </div>
    </div>
  </div>
  <!-- 底部按钮 -->
  <div class="bottom-input">
    <van-icon name="like-o" />
    <van-icon name="star-o" />
    <van-icon name="star-o" />
    <van-button v-if="route.query.id" :disabled="isEmpty" @click="pubPost" round class="btn"
      >完成编辑</van-button
    >
    <van-button v-else :disabled="isEmpty" @click="pubPost" round class="btn">发布帖子</van-button>
  </div>
  <!-- 底部安全区域 -->
  <div class="safeBottom"></div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { addPostService, getEditOneService, editPostService } from '@/api/post'
import type { postOneDataRes } from '@/type/post'
import { getPostCateService, addPostCateService, getOnePostCateService } from '@/api/cate'
import type { cateAllDataRes, cateData } from '@/type/cate'
import { useRouter, useRoute } from 'vue-router'
import { useNumStore } from '@/stores'
import { showToast } from 'vant'
import { getNowFormatDate } from '@/utils/data'
import { compressFile } from '@/utils/compress'
const useStore = useNumStore()
const router = useRouter()
const route = useRoute()
const message = ref<string>('') //贴文内容
const title = ref<string>('') //贴文标题
const fileList = ref<any>([]) //图片列表
let formData = new FormData() // 上传所需的表单
const cateList = ref<Array<cateData>>([]) //分类列表
const selectedCate = ref<any>(null) //已选择的分类
const isAddCate = ref<boolean>(false) //是否添加分类
const add_inp_ref = ref<any>(null) //分类添加输入框dom
const addCateVal = ref<string>('') //分类添加输入框的value
const cate_recommend_area_dom = ref<any>(null) //分类列表dom
const isDataEnd = ref<boolean>(false) //是否所有数据加载完毕
const isLoading = ref<boolean>(false) //是否在加载数据
const curPagenum = ref<number>(1) //当前页码
//选择标签
const selectCate = (item: any) => {
  selectedCate.value = item
}
//删除标签
const delCate = () => {
  selectedCate.value = null
}
//显示添加标签的输入框
const startAddCate = () => {
  addCateVal.value = ''
  isAddCate.value = true
  nextTick(() => {
    add_inp_ref.value.focus()
  })
}
//标签添加
const addCateHandle = async () => {
  isAddCate.value = false
  if (addCateVal.value === '') {
    return
  }

  await addPostCateService({
    cate_name: addCateVal.value,
    creater: useStore.userInfo.nick_name,
    creater_username: useStore.userInfo.username,
    creater_avatar: useStore.userInfo.avatar
  })

  let res = await getOnePostCateService({
    cate_name: addCateVal.value
  })

  cateList.value.unshift(res.data.data)
}
//图片上传数量太多的回调
const onOversize = () => {
  showToast({
    message: '文件大小不能超过 10mb',
    position: 'top'
  })
}
//照片上传后的回调
const afterRead = async (file: any) => {
  if (file instanceof Array) {
    file.forEach(async (item, index) => {
      let res = await compressFile(item.file)
      fileList.value[index + fileList.value.length - file.length].file = res
    })
  } else {
    let res = await compressFile(file.file)
    fileList.value[fileList.value.length - 1].file = res
  }
}
//判断上传文章是否为空
const isEmpty = computed(
  () => title.value === '' || message.value === '' || fileList.value.length === 0
)
//向后端上传贴文
const pubPost = async () => {
  if (route.query.id) {
    // 编辑贴文
    formData.append('id', route.query.id as string)
    fileList.value.forEach((item: any) => {
      if (item.file) {
        formData.append('cover_img', item.file)
      } else {
        if (formData.has('content_img')) {
          formData.set('content_img', formData.get('content_img') + ',' + item.objectUrl)
        } else {
          formData.append('content_img', item.objectUrl)
        }
      }
    })
    formData.append('title', title.value)
    formData.append('content', message.value)
    formData.append('cate_id', selectedCate.value ? selectedCate.value.cate_id : 0)
    await editPostService(formData)
    router.push('/home')
  } else {
    // 发布贴文
    formData.append('title', title.value)
    formData.append('content', message.value)
    formData.append('username', useStore.userInfo.username)
    formData.append('nick_name', useStore.userInfo.nick_name)
    formData.append('avatar', useStore.userInfo.avatar)
    formData.append('cate_id', selectedCate.value ? selectedCate.value.cate_id : 0)
    formData.append('pub_time', getNowFormatDate())
    fileList.value.forEach((item: any) => {
      formData.append('cover_img', item.file)
    })
    await addPostService(formData)
    router.push('/home')
  }
}
//滚动监听触发函数
const cateScroll = async () => {
  if (
    cate_recommend_area_dom.value.clientWidth + cate_recommend_area_dom.value.scrollLeft >=
      cate_recommend_area_dom.value.scrollWidth - 35 &&
    !isDataEnd.value &&
    !isLoading.value
  ) {
    curPagenum.value++
    isLoading.value = true

    let res: cateAllDataRes = await getPostCateService({ pagenum: curPagenum.value })
    cateList.value = [...cateList.value, ...res.data.data]
    if (res.data.data.length < 8) {
      isDataEnd.value = true
    }
    isLoading.value = false
  }
}
onMounted(async () => {
  if (route.query.id) {
    let res: postOneDataRes = await getEditOneService({ id: route.query.id as string })
    // 图片回显
    fileList.value = res.data.data.content_img.split(',').map((item) => {
      return {
        objectUrl: item,
        isImage: true
      }
    })
    //标题回显
    title.value = res.data.data.title
    //内容回显
    message.value = res.data.data.content
    //分类标签回显
    selectedCate.value = {
      cate_name: res.data.data.cate_name,
      cate_id: res.data.data.cate_id
    }
  }
  let res: cateAllDataRes = await getPostCateService({ pagenum: curPagenum.value })
  cateList.value = res.data.data
  cate_recommend_area_dom.value.addEventListener('scroll', cateScroll)
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
  }
  .cate_recommend_area {
    width: 82%;
    overflow-x: scroll;
    white-space: nowrap;
    overflow-y: hidden;
    display: flex;
    &::-webkit-scrollbar {
      display: none;
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
