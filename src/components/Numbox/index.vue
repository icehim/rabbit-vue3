<template>
  <div class="xtx-numbox">
    <div class="label" v-if="isShowLabel">数量</div>
    <div class="numbox">
      <!--点击加一-->
      <a @click="sub" href="javascript:;">-</a>
      <!--显示数量-->
      <input type="text" readonly :value="num">
      <!--点击减一-->
      <a @click="add" href="javascript:;">+</a>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'

export default {
  name: 'XtxNumBox',
  emits: ['update:modelValue'],
  props: {
    //  通过父传子
    isShowLabel: {
      type: Boolean,
      default: true
    },
    // 双向绑定变量接受（buyNum）
    modelValue: {
      type: Number,
      default: 1
    },
    // 最小
    min: {
      type: Number,
      default: 1
    },
    // 最大
    max: {
      type: Number,
      default: 10
    }
  },
  setup (props, { emit }) {
    const num = ref(1)
    // 点击加一
    const add = () => {
      // 已经最大了
      if (props.max === num.value) return
      num.value++
      // 把num最新值同步给modelValue
      emit('update:modelValue', num.value)
    }

    watch(() => props.modelValue, (newVal) => {
      // 2.把modelValue最新值同步给num
      num.value = newVal
    }, {
      // 默认同步一次
      immediate: true
    })
    // 点击减一
    const sub = () => {
      // 已经最小
      if (props.min === num.value) return
      num.value--
      emit('update:modelValue', num.value)
    }
    return { num, add, sub }
  }
}
</script>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;

  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }

  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;

    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;

      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }

      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }

    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
