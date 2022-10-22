/*
* 使用vue插件注册全局指令
* */

import { useIntersectionObserver } from '@vueuse/core'
import Load from '@/assets/images/load.gif'
export default {
  install (app) {
    // 注册全局指令(用法)
    // vue2语法： Vue.directive('指令名(不带v-)',{inserted(){}})
    // vue3语法: app.directive('指令名(不带v-)',{mounted(){}})
    app.directive('test', {
      // 使用test指令的元素被挂在选然后执行
      // dom  用test指令的元素dom对象
      // binding  获取指令绑定的值(binding.value)
      mounted (dom, binding) {
        console.log(dom, binding)
      }
    })

    /*
    * 使用vue指令实现图片懒加载=》<img v-imglazy="src" />
    * 思路:
    * 1.通过指令获取img的dom对象
    * 2.当img图片进入可视区，使用图片的dom对象给图片赋值(url)
    * */
    app.directive('imglazy', {
      mounted (imgDom, binding) {
        const { stop } = useIntersectionObserver(
          imgDom,
          // 注意事项:被检控的元素target,进入和离开可视区，都会执行回调函数
          ([{ isIntersecting }], observerElement) => {
            if (isIntersecting) {
              //  先显示一个loading
              imgDom.src = Load
              // 进入可视区使用图片的dom对象给图片的src赋值=》下载和渲染图片
              // binding.value 指令上绑定的图片地址
              setTimeout(() => {
                imgDom.src = binding.value
              }, 300)
              // 图片加载失败，默认显示图片
              imgDom.onerror = () => {
                imgDom.src = Load
              }

              // 关闭监控
              stop()
            }
          },
          //  阈值0~1 设置为0，加速接口请求
          {
            threshold: 0
          })
      }
    })
  }
}
