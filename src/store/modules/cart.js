// 购物车状态=》购物车商品数据
export default {
  namespaced: true,
  state: () => ({
    list: []
  }),
  mutations: {
    /*
    * state
    * good 当前要加入购物车的商品对象
    * */
    addCart (state, good) {
      /*
      * 把good加入list的业务逻辑:
      * 注意:判断之前是否加入过
      * 1.加入过=》累加数量
      * 2.没加入过=》新增
      * */
      const addIndex = state.list.findIndex(item => item.skuId === good.skuId)
      if (addIndex > -1) {
        // 加入过=》addIndex就是已经加入购物车商品的索引
        state.list[addIndex].count += good.count
      } else {
        // 没有加入过
        state.list.unshift(good)
      }
    }
  },
  actions: {
    /*
    * rootState=== store.state
    * 需求梳理:需要判断是否是登录状态
    * 1.未登录=》也能使用购物车=》只是寸到vuex并持久化到本地
    * 2.已登陆=》也能使用购物车=》调用后台接口存储购物车数据，然后存到vuex
    * */
    async addCartAction ({ commit, rootState }, good) {
      // rootState 获取其他模块state数据
      if (rootState.user.profile.token) {
        // 已经录 =》调用后台接口
        console.log('已登录')
      } else {
        // 未登录
        console.log('未登录')
        commit('addCart', good)
        return '加入成功'
      }
    }
  }
}
