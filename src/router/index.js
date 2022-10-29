import { createRouter, createWebHashHistory } from 'vue-router'
//  导入公共布局组件(一级路由)
const Layout = () => import('@/views/layout')
//  首页
const Home = () => import('@/views/home')
//  商品详情
const GoodDetail = () => import('@/views/good')
// 购物车
const Cart = () => import('@/views/cart')
// 创建订单页
const Settlement = () => import('@/views/Member/order/index.vue')
// 支付
const PayResult = () => import('@/views/Member/pay/result')
// 支付结果页
const Pay = () => import('@/views/Member/pay/index')
//  登录
const Login = () => import('@/views/login')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      // 首页
      { path: '/', component: Home },
      // 商品详情页
      { path: '/detail/:id', component: GoodDetail },
      // 购物车路由
      { path: '/cart', component: Cart },
      // 订单页
      { path: '/order', component: Settlement },
      // 支付
      { path: '/pay', component: Pay },
      // 支付结果页
      { path: '/pay/callback', component: PayResult }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,

  scrollBehavior () {
    // 作用：每次路由跳转页面都 重置滚动条位置
    // 写法
    // vue2:{x:0,y:0}
    // vue3：{ left: 0, top: 0 }
    return { left: 0, top: 0 }
  }
})
export default router
