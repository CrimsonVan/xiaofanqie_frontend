import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pxtovw from 'postcss-px-to-viewport'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
//vite.dev/config/
const loder_pxtovw = pxtovw({
  //这里是设计稿宽度 自己修改
  viewportWidth: 375,
  viewportUnit: 'vw'
})
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()]
    }),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  css: {
    postcss: {
      plugins: [loder_pxtovw]
    }
  },
  base: '/tsredbook',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
