<template>
  <div
    class="xtx-skeleton shan"
    :style="{ width: width+'px', height: height+'px' }"
  >
    <!-- 1 盒子-->
    <div class="block" :style="{ backgroundColor: bg}"></div>
    <!-- 2 闪效果 xtx-skeleton 伪元素 --->
  </div>
</template>
<script>
export default {
  // name作为组件注册的标签名
  name: 'XtxSkeleton',
  // 设计props的目的？=》复用性最大化
  props: {
    width: {
      type: Number,
      default: 60
    },
    height: {
      type: Number,
      default: 30
    },
    bg: {
      type: String,
      default: '#efefef'
    }
  }
}
</script>
<style scoped lang="less">
.xtx-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;

  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}

// 闪现动画
.shan {
  &::after {
    content: "";
    position: absolute;
    animation: shan 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(to left,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%);
    transform: skewX(-45deg);
  }
}

@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
</style>
