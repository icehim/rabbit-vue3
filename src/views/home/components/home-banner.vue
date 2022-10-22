<template>
  <div class="home-banner">
    <XtxSlider :data="list"/>
  </div>
</template>

<script>
import { findBanner } from '@/api/home'
import { ref } from 'vue'
export default {
  name: 'HomeBanner',
  setup () {
    /*
    * 渲染轮播图数据
    * 1.封装后台接口
    * 2.在页面导入调用接口
    * 3.定义变量存储后台数据
    * */
    const list = ref([])
    const getList = async () => {
      const res = await findBanner()
      list.value = res
    }
    // 发送请求
    getList()
    return { list }
  }
}
</script>

<style scoped lang='less'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>
