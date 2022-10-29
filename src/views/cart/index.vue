<template>
  <div class="xtx-cart-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>购物车</XtxBreadItem>
      </XtxBread>
      <div class="cart">
        <table>
          <thead>
          <tr>
            <!-- 全选 -->
            <th width="120"><XtxCheckBox :modelValue="isAll" @update:modelValue="checkAll">全选</XtxCheckBox></th>
            <th width="400">商品信息</th>
            <th width="220">单价</th>
            <th width="180">数量</th>
            <th width="180">小计</th>
            <th width="140">操作</th>
          </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
          <!--购物车有效商品列表-->
          <tr v-for="good in validList" :key="good.skuId">
            <!--单选
            问题:v-model会直会直接修改good.select的值，但是good.selected是vuex中的数据，只能通过mutations修改
            解决:使用mutations修改
            1.v-model不能直接使用=》因为他会直接修改vuex数据
            2.v-model(语法糖) = :modelValue + @update:modelValue(自定义修改)
            -->
            <!--<td><XtxCheckBox v-model="good.selected"/></td>-->
            <!--$event获取子传父的值=》获取选择框中选中状态的Boolean值-->
            <td><XtxCheckBox :modelValue="good.selected" @update:modelValue="singleCheck(good,$event)"/></td>
            <td>
              <div class="goods">
                <RouterLink to="/"><img :src="good.picture" alt=""></RouterLink>
                <div>
                  <p class="name ellipsis">{{good.name}}</p>
                  <!-- 选择规格组件 -->
                </div>
              </div>
            </td>
            <td class="tc">
              <!--当前售卖价-->
              <p>&yen;{{good.nowPrice}}</p>
              <p>比加入时降价 <span class="red">&yen;{{(good.price - good.nowPrice).toFixed(2)}}</span></p>
            </td>
            <td class="tc">
              <!--<XtxNumBox :isShowLabel="false" v-model="good.count"/>-->
              <XtxNumBox :isShowLabel="false" :modelValue="good.count" @update:modelValue="changeCount(good,$event)"/>
            </td>
            <!--当前行的总价-->
            <td class="tc"><p class="f16 red">&yen;{{(good.nowPrice * good.count).toFixed(2)}}</p></td>
            <td class="tc">
              <p><a class="green" href="javascript:;" @click="delCart(good)">删除</a></p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          共 {{validList.length}} 件商品，已选择 {{validSeled.length}} 件，商品合计：
          <span class="red">¥{{validSeledTotal}}</span>
        </div>
        <div class="total">
          <XtxButton type="primary" @click="goOrder">下单结算</XtxButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, useStore } from 'vuex'
import msg from '@/components/Message'
import { useRouter } from 'vue-router'
export default {
  name: 'XtxCartPage',
  computed: {
    ...mapGetters('cart', ['validList', 'validSeled', 'validSeledTotal', 'isAll'])
  },
  setup () {
    const store = useStore()
    /* 商品单选子传父回调函数
    * good 当选勾选的商品
    * isChecked（$event） 当前商品选中状态
    * */
    const singleCheck = (good, isChecked) => {
      console.log(good, isChecked)
      // 调用actions=>mutations修改
      store.dispatch('cart/singleCheckAction', { good, isChecked })
    }

    // 全选/取消全选
    const checkAll = (isAll) => {
      /*
      * 需求:全选框是否选中会影响列表中所有商品的选中状态：
      * 1.全选框选中=》列表商品全部选中
      * 2.全选框取消选中 =》列表商品全部取消选中
      * */
      store.dispatch('cart/allCheckAction', isAll)
    }

    // 删除购物车商品
    // good 当前删除商品对象
    const delCart = (good) => {
      store.dispatch('cart/delCartAction', good)
    }
    //  修改数量
    const changeCount = (good, count) => {
      console.log(good, count)
      // 调用actions=>mutations修改
      store.dispatch('cart/changeCountAction', { good, count })
    }

    // 下单
    const router = useRouter()
    const goOrder = () => {
      /*
      * 下单结算环节的主要任务就是做各种判断，其中包括
      * 1. 判断是否登录  token
      * 2. 判断是否选中有效商品  数量不能为零
      *   满足以上条件跳转去订单页面
      * */
      if (!store.state.user.profile.token) {
        return msg({ text: '请先登录' })
      }
      if (store.getters['cart/validSeled'].length === 0) {
        return msg({ text: '请选择至少一件商品下单' })
      }
      // 跳转下单页面
      router.push('/order')
    }
    return { singleCheck, checkAll, delCart, changeCount, goOrder }
  }
}
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,td{
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
