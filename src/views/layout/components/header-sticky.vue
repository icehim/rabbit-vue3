<template>
  <div class="app-header-sticky" :class="{show:y>80}">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!--复用菜单组件-->
      <HeaderNav />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from './header-nav'
import { useWindowScroll } from '@vueuse/core'
export default {
  name: 'AppHeaderSticky',
  components: { HeaderNav },
  // vue2实现
  /*
  * 吸顶实现:
  * 1.定义变量isShow =》控制是否添加show类名
  * 2.鉴定页面滚动，滚动到一定高度(80px),就显示
  *   1.滚动高度>80就显示
  *   2.滚动高度<80就不显示
  *  */
  // data () {
  //   return {
  //     isShow: false
  //   }
  // },
  // created () {
  // //监听页面滚动事件
  //   window.onscroll = () => {
  //     const scrollTop = document.documentElement.scrollTop
  //     if (scrollTop > 80) {
  //       this.isShow = true
  //     } else {
  //       this.isShow = false
  //     }
  //   }
  // }
  // vue3实现
  setup () {
    // const isShow = ref(false)
    // // 监听页面滚动事件
    // window.onscroll = () => {
    //   const scrollTop = document.documentElement.scrollTop
    //   if (scrollTop > 80) {
    //     isShow.value = true
    //   } else {
    //     isShow.value = false
    //   }
    // }
    // return { isShow }
    // 使用插件实现=> y就是滚动高度
    const { y } = useWindowScroll()
    return { y }
  }
}
</script>

<style scoped lang='less'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // ======== 此处为新增样式！！！！！！======
  // 默认情况下完全把自己移动到上面=> 不显示
  transform: translateY(-100%);
  // 完全透明
  opacity: 0;
  // 显示出来的类名
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
  // end
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url('~@/assets/images/logo.png') no-repeat  right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
