const { defineConfig } = require('@vue/cli-service')
// 覆盖webpack配置
module.exports = defineConfig({
  // 有eslint错误不会造成编译报错
  transpileDependencies: true,
  lintOnSave: true,
  devServer: { // 自定义服务配置
    open: true,
    port: 3000
  }
})
