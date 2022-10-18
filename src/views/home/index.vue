<template>
  <!--  测试-->
  <!--  <XtxSkeleton :width="100" :height="100" bg="#222"/>-->
  <div class="container">
<!--分类和轮播图-->
    <home-category/>
    <home-banner/>
<!--首页楼层模块-->
<!--新鲜好物-->
    <home-new/>
<!--人气推荐-->
    <home-hot/>
  </div>
</template>

<script>
import homeCategory from '@/views/home/components/home-category'
import homeBanner from '@/views/home/components/home-banner'
import homeNew from '@/views/home/components/home-new'
import homeHot from '@/views/home/components/home-hot'
export default {
  name: 'xtx-home-page',
  components: {
    homeCategory,
    homeBanner,
    homeNew,
    homeHot
  }
}
</script>

<style scoped lang='less'>
// 手动引入less变量
//@import "~@/styles/variables.less";

</style>
