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

/**
 * 加入购物车
 * @param {String} skuId - 商品SKUID
 * @param {Integer} count - 商品数量
 * @returns Promise
 */
export function insertCart ({ skuId, count }) {
  return request({
    url: '/member/cart',
    method: 'post',
    data: { skuId, count }
  })
}

/**
 * 删除商品（支持批量删除）
 * @param {Array<string>} ids - skuId集合
 * @returns Promise
 */

export function deleteCart (ids) {
  return request({
    url: '/member/cart',
    method: 'delete',
    data: { ids }
  })
}

/**
 * 修改购物车商品的状态和数量
 * @param {String} goods.skuId - 商品sku
 * @param {Boolean} goods.selected - 选中状态
 * @param {Integer} goods.count - 商品数量
 * @returns Promise
 */
export function updateCart (goods) {
  return request({
    url: '/member/cart/' + goods.skuId,
    method: 'put',
    data: goods
  })
}
