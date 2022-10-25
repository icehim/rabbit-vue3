/*
* 提供vee-validate插件需要的校验函数
* */
export default {
  // 校验account
  // value 是输入框的值
  // 校验不通过  返回错误信息，校验通过返回true
  account (value) {
    if (!value) return '请输入用户名'
    return true
  },
  // 校验密码
  password (value) {
    if (!value) return '请输入密码'
    if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
    return true
  },
  // 校验是否勾选用户协议
  isAgree (value) {
    if (!value) return '请勾选同意用户协议'
    return true
  }
}
