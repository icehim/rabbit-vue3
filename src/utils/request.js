import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 防止多次请求
// let cancelArr = []

// 取消所有请求
// export function cancelAll () {
//   cancelArr = cancelArr.filter(item => {
//     item.fn()
//     return false
//   })
// }

// baseURL 超时时间配置
const _axios = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front.itheima.net'
})

//  请求拦截器
//  全局注入token

_axios.interceptors.request.use((config) => {
  // 取消：找出相同的api请求进行取消（url与method相同）
  // cancelArr = cancelArr.filter(item => {
  //   if (item.url === config.url && item.method === config.method) {
  //     item.fn()
  //     return false
  //   }
  //   return true
  // })

  // config.cancelToken = new axios.CancelToken((cancelFn) => {
  //   // 存储取消方法
  //   cancelArr.push({ url: config.url, method: config.method, fn: cancelFn })
  // })
  const token = store.state.user.profile.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

//  响应拦截器
//  处理返回数据 1.简化后台返回数据 2.token失效跳回到登录页
_axios.interceptors.response.use(response => {
  // 请求成功，返回数据
  //  简化返回数据
  const { result } = response.data
  return result
}, (error) => {
  // 请求失败
  // 401说明token失效，重新登录
  // console.log(error.response)
  if (error.response.status === 401) {
    // 需求跳回登陆后，登录成功，可以返回上次访问的页面
    //  获取当前页面地址:router.currentRoute.value.fullPath
    //  注意:vue3获取的时候router.currentRoute.value 加上.value
    const redirectUrl = router.currentRoute.value.fullPath
    router.replace(`/login?redirectUrl=${redirectUrl}`)
  }
  return Promise.reject(error)
})
export default _axios
/*
* 对instance进行二次封装（非必须）
* 需求:封装一个方法，接受三个参数:url，method，data
* 问题:
* 1.axios中发get请求，参数名:params
* 2.axios中发post请求，参数名:data
*  */
// export default function request (url, method, data) {
//   return instance({
//     url,
//     method,
//     // params:data => get请求
//     // data:data => post请求
//     //  根据method动态判断属性名=》1.如果是get参数名叫params 2.如果是post参数名叫data
//     [method === 'get' ? 'params' : 'data']: data
//   })
// }
