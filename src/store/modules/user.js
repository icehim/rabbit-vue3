// 用户状态=>登陆人相关的数据
import { userAccountLogin } from '@/api/user'

export default {
  namespaced: true,
  //  和组件中data() {return {}}  避免引用
  state: () => ({
    profile: {
      id: '',
      avatar: '',
      nickname: '',
      account: '',
      mobile: '',
      token: ''
    }
  }),
  mutations: {
    // 存储登陆人信息
    setProfile (state, profile) {
      state.profile = profile
    },
    // 删除登陆人信息(退出登录)
    delProfile (state, profile) {
      state.profile = {}
    }
  },
  actions: {
    // 获取登陆人信息
    async getProfileAction ({ commit }, formData) {
      const profile = await userAccountLogin(formData)
      commit('setProfile', profile)
    },
    // 退出登录
    async logoutAction ({ commit }) {
      // 删除登陆热信息
      commit('delProfile')
      // 清空购物车商品数据(跨模块调用vuex)
      commit('cart/setList', [], { root: true })
    }
  }
}
