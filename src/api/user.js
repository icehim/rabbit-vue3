import request from '@/utils/request'

// 帐号登录
export function userAccountLogin (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
