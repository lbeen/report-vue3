import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'

import 'lib-flexible/flexible'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
