// 首页后台接口封装
import request from '@/utils/request'

// 分类
export function findHeadCategory () {
  return request({
    url: '/home/category/head'
  })
}
// 轮播图 banner
export function findBanner () {
  return request({
    url: 'home/banner'
  })
}

// 获取新鲜好物
export function findNew () {
  return request({
    url: 'home/new'
  })
}

// 获取人气推荐
export function findHot () {
  return request({
    url: 'home/hot'
  })
}
