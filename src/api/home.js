// 首页后台接口封装
import request from '@/utils/request'

//  测试
export function findHeadCategory () {
  return request({
    url: '/home/category/head'
  })
}
