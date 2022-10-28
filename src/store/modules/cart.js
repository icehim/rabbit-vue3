// 购物车状态=》购物车商品数据

export default {
  namespaced: true,
  state: () => ({
    list: []
  }),

  getters: {
    // 在`getters`中新增：
    // 1. 有效商品列表=》无效商品（没库存或下架了）
    // 2. 选中的购物车商品数据
    // 3. 选中商品总价
    // 4. 购物车中有效商品是否是全部选中状态
    // 有效商品列表（购物车页面列表渲染）
    validList: state => {
      return state.list.filter(item => item.isEffective)
    },
    // 选中的购物车商品数据
    validSeled: (state, getterts) => {
      return getterts.validList.filter(item => item.selected)
    },
    // 选中的购物车商品数据总价
    validSeledTotal: (state, getterts) => {
      return getterts.validSeled.reduce((acc, item) => (acc += item.count * item.nowPrice), 0)
    },
    // 有效商品是否是全部选中状态
    isAll: (state, getterts) => {
      return getterts.validList.every(item => item.selected)
    }
  },
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
    },
    singleCheck (state, { good, isChecked }) {
      // 1.找到当前要做单选的商品数据
      const currGood = state.list.find(item => item.skuId === good.skuId)
      // 2.修改选中状态
      currGood.selected = isChecked
    },
    // isAll 全选矿是否选中的状态
    allCheck (state, isAll) {
      state.list.forEach(item => {
        item.selected = isAll
      })
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
    },
    /*
    * 商品单选
    * */
    async singleCheckAction ({ commit, rootState }, { good, isChecked }) {
      // rootState 获取其他模块state数据
      if (rootState.user.profile.token) {
        // 已经录 =》调用后台接口
      } else {
        // 未登录
        commit('singleCheck', { good, isChecked })
      }
    },
    // 商品全选，取消全选
    async allCheckAction ({ commit, rootState }, isAll) {
      // rootState 获取其他模块state数据
      if (rootState.user.profile.token) {
        // 已经录 =》调用后台接口
      } else {
        // 未登录
        commit('allCheck', isAll)
      }
    }

  }
}
