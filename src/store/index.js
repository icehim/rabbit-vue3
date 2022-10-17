import { createStore } from 'vuex'

import user from '@/store/modules/user'
import cart from '@/store/modules/cart'
import category from '@/store/modules/category'
// 导入本地自动持久化插件
import createPersistedstate from 'vuex-persistedstate'
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart,
    category
  },
  //  插件选项
  plugins: [
    // createPersistedstate方法默认不穿参数=》存所有，属性名叫vuex
    createPersistedstate({
      key: 'rabbit-vue3', // 指定存储的属性名
      // paths: ['user.profile.nickname']// 指定存储什么数据
      paths: ['user', 'cart']// 指定存储什么数据=>只存储user和cart模块的数据
    })
  ]
})
