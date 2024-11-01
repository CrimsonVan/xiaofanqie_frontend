<template>
  <Waterfall
    :delay="5"
    :posDuration="10"
    :animationDelay="5"
    :animationDuration="5"
    :gutter="4"
    :list="waterfallList"
    :breakpoints="breakpoints"
  >
    <template #default="{ item }">
      <div @click="godetail(item.url)" class="card">
        <img class="card-img" :src="item.url" alt="" />
        <div class="card-text">
          <div class="card-text-top">峰哥安全抵达基辅，睡醒后开始给粉丝路祝福哈哈哈哈哈哈</div>
          <div class="card-text-bottom">
            <img class="card-text-bottom-img" :src="item.url" alt="" />
            <span class="card-text-bottom-name">峰哥小迷弟</span>
            <span class="card-text-bottom-like">2791</span>
          </div>
        </div>
      </div>
    </template>
  </Waterfall>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import 'vue-waterfall-plugin-next/dist/style.css'
import { Waterfall } from 'vue-waterfall-plugin-next'
import { useRouter } from 'vue-router'
import { throttle } from '@/utils/throttle'
const router = useRouter()
const loading = ref(true)
const waterfallList = ref([
  {
    id: 1,
    text: '0',
    left: 0,
    top: 0,
    height: 150,
    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/e69858186deb93429436ec0b194e3967_720.jpg'
  },

  {
    id: 2,

    text: '1',
    left: 0,
    top: 0,
    height: 90,
    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/s28447008.jpg'
  },
  {
    id: 3,
    text: '2',
    left: 0,
    top: 0,
    height: 90,

    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/E721CEB99185577D3256A73512D8DE12.jpg'
  },
  {
    id: 4,
    text: '3',
    left: 0,
    top: 0,
    height: 170,

    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/3454545372.jpg'
  },
  {
    id: 5,
    text: '4',
    left: 0,
    top: 0,
    height: 180,
    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/3454666570.jpg'
  },
  {
    id: 6,
    text: '5',
    left: 0,
    top: 0,
    height: 90,
    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/615DFB41613FC1BC3672D5933E28EEF4.jpg'
  },
  {
    id: 7,
    text: '6',
    left: 0,
    top: 0,
    height: 90,
    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/CD55142D8F50F651E3C0D3B1D6C9006B.jpg'
  },
  {
    id: 8,
    text: '7',
    left: 0,
    top: 0,
    height: 150,
    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/3454420933.jpg'
  },
  {
    text: '8',
    left: 0,
    top: 0,
    height: 150,

    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/cloudstorage/895ea7ab-056a-4957-86e5-0da5637d0ae8.jpg'
  },
  {
    text: '9',
    left: 0,
    top: 0,
    height: 80,

    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/yufan.jpg'
  },
  {
    text: '10',
    left: 0,
    top: 0,
    height: 100,
    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/e69858186deb93429436ec0b194e3967_720.jpg'
  }
])
const testList = ref([
  {
    id: 1,
    text: '0',
    left: 0,
    top: 0,
    height: 150,
    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/e69858186deb93429436ec0b194e3967_720.jpg'
  },

  {
    id: 2,

    text: '1',
    left: 0,
    top: 0,
    height: 90,
    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/s28447008.jpg'
  },
  {
    id: 1,
    text: '0',
    left: 0,
    top: 0,
    height: 150,
    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/e69858186deb93429436ec0b194e3967_720.jpg'
  },
  {
    id: 1,
    text: '0',
    left: 0,
    top: 0,
    height: 150,
    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/e69858186deb93429436ec0b194e3967_720.jpg'
  },
  {
    id: 2,

    text: '1',
    left: 0,
    top: 0,
    height: 90,
    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/s28447008.jpg'
  },
  {
    id: 1,
    text: '0',
    left: 0,
    top: 0,
    height: 150,
    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/e69858186deb93429436ec0b194e3967_720.jpg'
  },

  {
    id: 2,

    text: '1',
    left: 0,
    top: 0,
    height: 90,
    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/s28447008.jpg'
  },

  {
    id: 2,

    text: '1',
    left: 0,
    top: 0,
    height: 90,
    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/s28447008.jpg'
  },
  {
    id: 1,
    text: '0',
    left: 0,
    top: 0,
    height: 150,
    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/e69858186deb93429436ec0b194e3967_720.jpg'
  },

  {
    id: 2,

    text: '1',
    left: 0,
    top: 0,
    height: 90,
    url: 'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/s28447008.jpg'
  }
])
const breakpoints = ref({
  3000: {
    //当屏幕宽度小于等于3000
    rowPerView: 6 // 一行8图
  },
  1800: {
    //当屏幕宽度小于等于1800
    rowPerView: 4 // 一行6图
  },
  800: {
    //当屏幕宽度小于等于1200
    rowPerView: 3
  },

  500: {
    //当屏幕宽度小于等于500
    rowPerView: 2
  }
})
const godetail = (url: string) => {
  console.log('打印传参', url)

  router.push(`/detail?picurl=${url}`)
}
// let arr = [1, 2, 3]
// 触底函数
window.addEventListener('scroll', throttle(onBottom, 1000))

// 触底相应函数
function onBottom() {
  if (!loading.value) {
    return
  }
  // 获取可视高度
  let clientHeight = document.documentElement.clientHeight
  console.log('打印高度', clientHeight)

  // 获取滚动高度
  let scrollTop = document.documentElement.scrollTop
  console.log('打印scrollTop', scrollTop)

  // 滚动条高度
  let scrollHeight = document.documentElement.scrollHeight
  if (clientHeight + scrollTop >= scrollHeight - 170) {
    console.log('触底之前', waterfallList.value.length)
    waterfallList.value = [...waterfallList.value, ...testList.value]
    console.log('触底之后', waterfallList.value.length)
  }
}
</script>
<style lang="scss" scoped>
.waterfall-list[data-v-1c4c57b0] {
  background-color: #f5f5f5;
  .card {
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    .card-img {
      width: 100%;
    }
    .card-text {
      width: 100%;
      overflow: hidden;
      .card-text-top {
        margin: 2px auto;
        width: 93%;
        font-size: 14px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-clamp: 2;
        color: black;
      }
      .card-text-bottom {
        width: 93%;
        margin: 6px auto 6px;
        display: flex;
        align-items: center;
        .card-text-bottom-img {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          overflow: hidden;
        }
        .card-text-bottom-name {
          margin-left: 6px;
          font-size: 8px;
          color: #8e8e8e;
        }
        .card-text-bottom-like {
          margin-left: auto;
          margin-right: 0px;
          font-size: 11px;
          color: #8e8e8e;
        }
      }
    }
  }
}
</style>
