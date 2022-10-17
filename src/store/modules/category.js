import { findHeadCategory } from '@/api/home'

export default {
  namespaced: true,
  // 1.定义响应变量(vue2里data变量)
  state: {
    // 菜单分类数据
    list: []
  },
  // 2.提供修改state变量的方法(同步)
  mutations: {
    setList (state, list) {
      state.list = list
    }
  },
  // 3.提供方法发请求获取后台数据存储到state(异步)
  actions: {
    //  获取菜单数据
    async getListAction ({ commit }, payload) {
      const res = await findHeadCategory()
      console.log('菜单数据', res)
      commit('setList', res)
    }
  }
}
