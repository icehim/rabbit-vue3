import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入全局组件插件
import ComponentPlugin from '@/components'
// 导入全局指令插件
import Directives from '@/directives'

// 导入重置浏览器默认样式
import 'normalize.css'
import '@/styles/common.less'
createApp(App).use(store).use(router).use(ComponentPlugin).use(Directives).mount('#app')
