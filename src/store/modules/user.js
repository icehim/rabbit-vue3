// 用户状态=>登陆人相关的数据
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
    //  测试 修改nickname
    setNickname (state, name) {
      state.profile.nickname = name
    }
  }
}
