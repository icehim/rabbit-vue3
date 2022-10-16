<template>
<!--一级路由挂载点-->
  <div class="test">
    <ul>
      <li>{{$store.state.user.profile}}</li>
      <li>
        <button @click="$store.commit('user/setNickname',Math.random()*100)">修改vuex数据，会自动存储到本地</button>
      </li>
      <li>
        <button @click="btnClick">测试</button>
      </li>
    </ul>
  </div>
  <router-view/>
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
