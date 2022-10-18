import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入插件
import ComponentPlugin from '@/components'
import 'normalize.css'
import '@/styles/common.less'
createApp(App).use(store).use(router).use(ComponentPlugin).mount('#app')
