<template>
  <homePanel ref="target" title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <template #right>
<!--更多组件(需要导入注册)-->
      <xtx-more></xtx-more>
    </template>
    <template #default>
      <ul ref="pannel" class="goods-list">
        <li v-for="item in list" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="name">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
    </template>
  </homePanel>
</template>

<script>

import { findNew } from '@/api/home'
import { ref } from 'vue'
import homePanel from '@/views/home/components/home-panel'
import { useObserve } from '@/hooks'
// 导入监控元素或组件是否在视口
export default {

  components: {
    homePanel
  },
  setup () {
    // 1.定义响应式数据
    const list = ref([])
    const getList = async () => {
      const res = await findNew()
      list.value = res
    }
    // 无脑发请求
    // getList()
    // 执行数据懒加载
    const { target } = useObserve(getList)
    return { list, target }
  }

}
</script>

<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    // 激活效果
    transition: all 0.5s;
    &:hover {
      transform: translate3d(0, -6px, 0);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    }
    // end
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
