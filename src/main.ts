import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import router from './router'
import { Toast } from 'vant'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Toast)
app.mount('#app')
