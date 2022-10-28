const { defineConfig } = require('@vue/cli-service')
const path = require('path')
// 覆盖webpack配置
module.exports = defineConfig({
  // 有eslint错误不会造成编译报错
  transpileDependencies: true,

  lintOnSave: true,

  devServer: { // 自定义服务配置
    open: true,
    port: 8080
  },
  // 这个是给webpack-dev-server开启可以IP和域名访问权限
  configureWebpack: {
    devServer: { allowedHosts: ['www.corho.com'] }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 配置哪些文件需要自动导入
        path.join(__dirname, '/src/styles/variables.less')
      ]
    }
  }
})
