import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
import dataV from '@jiaminghi/data-view'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(dataV)
app.mount('#app')
