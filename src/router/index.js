import { createRouter, createWebHashHistory } from 'vue-router'
//  导入公共布局组件(一级路由)
const Layout = () => import('@/views/layout')
//  首页
const Home = () => import('@/views/home')
//  商品详情
const GoodDetail = () => import('@/views/good')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      // 首页
      { path: '/', component: Home },
      // 商品详情页
      { path: '/detail/:id', component: GoodDetail }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
