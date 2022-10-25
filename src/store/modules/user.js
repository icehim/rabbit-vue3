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
    async getProfileAction ({ commit }, formData) {
      const profile = await userAccountLogin(formData)
      commit('setProfile', profile)
    }
  }
}
