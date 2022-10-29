import request from '@/utils/request'
/**
 * 合并本地购物车
 * @param {Array<object>} cartList - 本地购物车数组
 * @param {String} item.skuId - 商品skuId
 * @param {Boolean} item.selected - 是否选中
 * @param {Integer} item.count - 数量
 */

export function mergeLocalCart (cartList) {
  return request({
    url: '/member/cart/merge',
    method: 'post',
    data: cartList
  })
}

/**
 * 获取登录后的购物车列表
 * @returns Promise
 */
export function findCartList () {
  return request({
    url: '/member/cart'
  })
}
