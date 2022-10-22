/*
* 自己封装可复用的钩子函数(数据和逻辑)
* */
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export function useObserve (apiFn) {
  const target = ref(null)// 被监控的元素
  const { stop } = useIntersectionObserver(
    target,
    // 注意事项:被检控的元素target,进入和离开可视区，都会执行回调函数
    ([{ isIntersecting }], observerElement) => {
      // 组件数据懒加载:在视口发请求=>执发一次
      if (isIntersecting) {
        // 在视口发请求
        // getList()
        apiFn()// 发送后台请求的方法
        // 关闭监控
        stop()
      }
    },
    //  阈值0~1 设置为0，加速接口请求
    {
      threshold: 0
    })
  return { target }
}
