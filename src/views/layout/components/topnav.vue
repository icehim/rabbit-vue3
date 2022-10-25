<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!--登录后 template不会渲染任何元素-->
        <template v-if="profile.token">
        <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{profile.account || profile.nickname }}</a></li>
        <li><a href="javascript:;" @click="logout">退出登录</a></li>
        </template>
        <!--没有登录-->
        <template v-else>
        <li><router-link to="/login">请先登录</router-link></li>
        <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li><a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapState, useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'AppTopnav',
  computed: { // 计算属性
    // mapState('模块名',['模块下的变量名1','模块下的变量名2'])
    ...mapState('user', ['profile'])
  },
  setup () {
    // 注意事项:点击情况下 不要嵌套使用
    const store = useStore()
    const router = useRouter()
    const logout = () => {
      store.dispatch('user/logoutAction')
      router.replace('/login')
    }
    return { logout }
  }
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
