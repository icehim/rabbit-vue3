<template>
<!--一级路由挂载点-->
  <div class="test">
    <router-view/>
  </div>
</template>
<script>
import { homeNewSimple } from '@/api/home'
export default {
  setup () {
    const btnClick = () => {
      homeNewSimple().then(res => {
        console.log(res)
      })
    }
    return { btnClick }
  }
}

</script>

<style lang="less">

</style>
