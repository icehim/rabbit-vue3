<template>
    <div class="container">
      <home-category/>
      <home-banner/>
    </div>
</template>

<script>
import homeCategory from '@/views/home/components/home-category'
import homeBanner from '@/views/home/components/home-banner'
export default {
  name: 'xtx-home-page',
  components: {
    homeCategory,
    homeBanner
  }
}
</script>

<style scoped lang='less'>
// 手动引入less变量
//@import "~@/styles/variables.less";

</style>
