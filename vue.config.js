module.exports = {
  // 路由接口代理配置
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8050/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

