<template>
  <div class="home-product" ref="target">
    <!-- 面板组件 -->
    <HomePanel :title="floor.name" v-for="floor in prodList" :key="floor.id">
      <!--右侧内容-->
      <template #right>
        <!--楼层下的子分类-->
        <div class="sub">
          <RouterLink v-for="item in floor.children" :key="item.id" to="/">{{ item.name }}</RouterLink>
        </div>
        <XtxMore/>
      </template>
      <!--展示商品列表内容-->
      <div class="box">
        <!--左侧广告banner-->
        <RouterLink class="cover" to="/">
          <img v-imglazy="floor.picture" alt="">
          <strong class="label">
            <span>{{ floor.name }}馆</span>
            <span>{{ floor.saleInfo }}</span>
          </strong>
        </RouterLink>
        <!--右侧商品列表-->
        <ul class="goods-list">
          <li v-for="good in floor.goods" :key="good.id">
            <!-- 商品组件(展示单个商品) -->
            <HomeGoods :good="good"/>
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel'
import HomeGoods from './home-goods'
import { ref } from 'vue'
import { findGoods } from '@/api/home'
import { useObserve } from '@/hooks'

export default {
  name: 'HomeProduct',
  components: { HomePanel, HomeGoods },
  setup () {
    /*
    * 业务开发
    * 1.封装后台接口
    * 2.页面中定义响应变量
    * 3.调用接口获取后台数据,存到响应变量上
    * 4.在模板中绑定数据
    * */
    const prodList = ref([])
    const getProdList = async () => {
      const res = await findGoods()
      prodList.value = res
    }
    getProdList()
    //  组件数据懒加载=>进入视口发送请求
    // target指定被检控的元素
    const { target } = useObserve(getProdList)

    return { prodList, target }
  }
}
</script>

<style scoped lang='less'>
.home-product {
  background: #fff;
  height: 2900px;

  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: @xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, .9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, .7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n+4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
