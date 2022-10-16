// 首页后台接口封装
import request from '@/utils/request'

//  测试
export function homeNewSimple () {
  return request({
    url: '/home/new/simple'
  })
}
