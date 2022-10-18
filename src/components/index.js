/*
*   使用vue插件注册全局组件
*   语法:
*   install方法参数发生了变化
*   vue2:{install(Vue){}} =》Vue构造函数
*   vue3:{install(app){}} =》app实例
* */
import Skeleton from '@/components/Skeleton'
import Slider from '@/components/Slider'
import More from '@/components/More'
const cps = [Skeleton, Slider, More]
export default {
  install (app) {
    // console.log(app)
    // 批量注册
    cps.forEach(cp => {
      app.component(cp.name, cp)
    })
  }
}
