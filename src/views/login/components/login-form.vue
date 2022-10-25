<template>
  <div class="account-box">
    <!--1.使用Form组件包裹表单区域-->
    <Form :validation-schema="rules" v-slot="{ errors }" class="form">
      <!--测试=> errors对象可以获取校验结果-->
      <!--
      1.校验通过:errors里是个空对象
      2.校验失败：errors里包含校验失败表单想的错误提示信息
      -->
      <p>{{ errors }}</p>
      <div class="form-item">
        <div class="input">
          <i class="iconfont icon-user"></i>
          <!--2.替换表单input元素为Filed组件-->
          <!--用户名-->
          <Field type="text" name="account" :class="{error:errors.account}" v-model="formData.account"
                 placeholder="请输入用户名或手机号"/>
        </div>
        <!-- 表单验证错误信息提示 -->
        <div v-if="errors.account" :class="{errtips:errors.account}" class="error">
          <i class="iconfont icon-warning"/>{{ errors.account }}
        </div>
      </div>
      <div class="form-item">
        <div class="input">
          <i class="iconfont icon-lock"></i>
          <!--密码-->
          <Field type="password" :class="{error:errors.password}" name="password" v-model="formData.password"
                 placeholder="请输入密码"/>
        </div>
        <div v-if="errors.password" :class="{errtips:errors.password}" class="error"><i class="iconfont icon-warning"/>{{
            errors.password
          }}
        </div>
      </div>
      <div class="form-item">
        <div class="agree">
          <!--校验自定义组件-->
          <!--as="自定义组件的标签名"-->
          <Field as="XtxCheckBox" name="isAgree" v-model="formData.isAgree">
            <span>我已同意</span>
          </Field>
          <!--<XtxCheckBox/>-->
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <!--错误提示信息-->
        <div v-if="errors.isAgree" :class="{errtips:errors.isAgree}" class="error"><i
          class="iconfont icon-warning"/>{{ errors.isAgree }}
        </div>
      </div>
      <a href="javascript:;" class="btn">登录</a>
    </Form>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { Form, Field } from 'vee-validate'
import { reactive } from 'vue'
import validateFns from '@/utils/validate'

export default {
  components: {
    Form,
    Field
  },
  setup () {
    /*
    * 实现校验
    * 1.准备表单数据
    * 2.准备校验规则
    * */
    const formData = reactive({
      account: '', // 用户名
      password: '', // 密码
      isAgree: false// 是否同意协议
    })

    // 把校验规则定义为一个普通的js对象(不是响应式的)
    const rules = {
      account: validateFns.account,
      password: validateFns.password,
      isAgree: validateFns.isAgree
    }
    return { formData, rules }
  }

}
</script>
<style lang="less" scoped>
.errtips {
  color: #e40438;
  animation-name: errtips;
  animation-duration: 0.5s;
}

@keyframes errtips {
  10% {
    transform: translateY(1px);
  }
  20% {
    transform: translateY(-1px);
  }
  30% {
    transform: translateY(1px);
  }
  40% {
    transform: translateY(-1px);
  }
  50% {
    transform: translateY(1px);
  }
  60% {
    transform: translateY(-1px);
  }
  70% {
    transform: translateY(1px);
  }
  80% {
    transform: translateY(-1px);
  }
  90% {
    transform: translateY(1px);
  }
  100% {
    transform: translateY(0);
  }
}

// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: @xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: @priceColor;
          }

          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
