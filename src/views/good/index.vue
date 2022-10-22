<template>
  <div class='xtx-goods-page'>
    <div class="container" v-if="goodDetail.categories"><!--等待数据加载完成在渲染模板-->
      <!-- 面包屑 -->
      <XtxBread separator="/">
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <!--一级分类-->
        <XtxBreadItem to="/">{{ goodDetail.categories[1].name }}</XtxBreadItem>
        <!--二级分类-->
        <XtxBreadItem to="/">{{ goodDetail.categories[0].name }}</XtxBreadItem>
        <!--商品名-->
        <XtxBreadItem to="/">{{ goodDetail.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 新增结构 -->
        <!-- 图片预览区 商品主图-->
        <div class="media">
          <goods-image :mainImg="goodDetail.mainPictures"/>
          <goods-sales/>
        </div>
        <!-- 商品信息区 -->
        <div class="spec">
          <goodInfos />
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <div class="goods-tabs">
            <!-- 详情图片列表 -->
            <img v-for="(img,i) in goodDetail.details.pictures" :key="i" v-imglazy="img"/>
          </div>
        </div>
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { findGoodDetail } from '@/api/good'
import { ref, provide } from 'vue'
import { useRoute } from 'vue-router'
import goodsImage from '@/views/good/components/goods-image'
import goodsSales from '@/views/good/components/goods-sales'
import goodInfos from '@/views/good/components/goods-name'
export default {
  name: 'XtxGoodsPage',
  components: {
    goodsImage, goodsSales, goodInfos
  },
  setup () {
    const goodDetail = ref({})
    // 获取路由参数对象=> route === this.$route
    provide('goodDetail', goodDetail)
    const route = useRoute()
    const getGoodDetail = async () => {
      const res = await findGoodDetail({ id: route.params.id })
      goodDetail.value = res
      // 获取数据并存储之后（错误！！）=》注意:provide函数只能在setup函数第一层调用
      provide('goodDetail', goodDetail)
    }

    getGoodDetail()
    return { goodDetail }
  }
  // vue2 获取路由参数
  // created () {
  //   console.log(this.$route.params)
  // }
}
</script>

<style scoped lang='less'>
.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
    background: #fff;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  img {
    width: 100%;
  }
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  // 新增样式
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
</style>
