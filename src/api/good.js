import request from '@/utils/request'

//  获取详情数据
export function findGoodDetail (params) {
  return request({
    url: '/goods',
    params
  })
}
