<template>
  <!--测试-->
  <!--x, y, isOutside, elementX, elementY-->

  <div class="goods-image">
    <!--放大镜显示的放大区域弹层-->
    <div
      class="large"
      v-show="!isOutside"
      :style="[{
      backgroundImage:`url(${mainImg[currIndex]})`,
      backgroundPosition:`${bgPos.x}px ${bgPos.y}px`
    }]">
    </div>
    <!--middle盒子是滑块滑动区域-->
    <div class="middle" ref="target">
      <!--当前显示的主图-->
      <img :src="mainImg[currIndex]" alt="">
      <!-- 蒙层容器 -->
      <div class="layer" v-show="!isOutside" :style="{left:`${pos.left}px`,top:`${pos.top}px`}"></div>
    </div>
    <!--商品主图列表-->
    <ul class="small">
      <li v-for="(img,i) in mainImg" :class="{active:currIndex===i}" :key="i" @mouseenter="currIndex=i">
        <img :src="img" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

export default {
  name: 'GoodsImage',
  props: {
    // 商品主图列表数据
    mainImg: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    /*
    * 需求:鼠标移动到对应小图上，在左侧显示小图的大图
    * 思路：
    * 1.记录当前鼠标经过的索引值
    * 2.根据索引值获取图片地址=》显示到大图中
    *
    * */
    const currIndex = ref(0)
    /*
    *需求:实现图片放大镜
    * 前置知识:
    * 1.了解网页坐标系(2维) =》结论:左边系是从左上角开始的:{x:0,y:0}
    * 2.借助useMouseElement获取坐标系的值
    * 实现思路:
    *   1.获取target元素内坐标系的值
    *   2.根据target元素内左边系的值，动态(实时)计算蒙层滑块left和top的值
    *     注意: 1.蒙层滑块滑动是在target元素内移动!!
    *     计算蒙层移动的公式:
    *       left = elementX - 100 | top = elementY - 100
    *     蒙层的移动范围:
    *       100 < elementX < 300
    *       100 < elementY < 300
    *
    *   3.根据蒙层滑块left和top的值计算获取方放大区域的坐标值
    * */
    // target指定坐标系的范围
    const target = ref(null)
    const { x, y, elementX, elementY, isOutside } = useMouseInElement(target)
    // 监控 elementX, elementY 的变化
    const pos = ref({ left: 0, top: 0 })
    // 计算图片显示的位置(放大部分图片的位置)
    const bgPos = ref({ x: 0, y: 0 })
    watch([elementX, elementY], () => {
      // 1.x轴：计算left(左右)
      if (elementX.value < 100) {
        // 左边超出了=>重置为0
        pos.value.left = 0
      } else if (elementX.value > 300) {
        // 右侧超出=》重置为
        pos.value.left = 200
      } else {
        // 范围内移动
        pos.value.left = elementX.value - 100
      }

      // 1.y轴：计算top(上下)
      if (elementY.value < 100) {
        // 上边超出了=>重置为0
        pos.value.top = 0
      } else if (elementY.value > 300) {
        // 下边超出=》重置为
        pos.value.top = 200
      } else {
        // 范围内移动
        pos.value.top = elementY.value - 100
      }
      bgPos.value.x = -pos.value.left * 2
      bgPos.value.y = -pos.value.top * 2
    })
    return { x, y, currIndex, isOutside, elementX, elementY, pos, target, bgPos }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;

    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover, &.active {
        border: 2px solid @xtxColor;
      }
    }
  }

  //放大镜弹出样式
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
}
</style>
