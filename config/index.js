// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  appProd: {
    env: require('./app.prod.env'),
    index: path.resolve(__dirname, '../www/index.html'),
    assetsRoot: path.resolve(__dirname, '../www'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '', // 去掉绝对路径 '/', cordova打包后的app是file://本地协议
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  appDev: {
    env: require('./app.dev.env'),
    index: path.resolve(__dirname, '../www/index.html'),
    assetsRoot: path.resolve(__dirname, '../www'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '', // 去掉绝对路径 '/', cordova打包后的app是file://本地协议
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 9997,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/api': {
      //   target: 'http://core-test.fnsudai.com',
      //   changeOrigin: true,
      //   onProxyRes: function(proxyRes, req, res) {
      //     // console.log(proxyRes.headers, '\n')
      //     // proxyRes.headers['x-auth-token'] = 'adfa-adsfaf-asf'
      //     // delete proxyRes.headers['set-cookie'] // 删除Rap上的cookie设置因为会影响到/api/usermanage的cookie设置
      //   },
      //   pathRewrite: function(path, req) {
      //     return path.replace('/api/', '/')
      //   }
      // }
      '/api': {
        target: 'http://tuibiji.kuchuan.com',
        changeOrigin: true,
        onProxyRes: function(proxyRes, req, res) {
          // console.log(proxyRes.headers, '\n')
          // proxyRes.headers['x-auth-token'] = 'adfa-adsfaf-asf'
          // delete proxyRes.headers['set-cookie'] // 删除Rap上的cookie设置因为会影响到/api/usermanage的cookie设置
        },
        pathRewrite: function(path, req) {
          return path.replace('/api/', '/')
        }
      }
      // '/api': {
      //   target: 'http://localhost:3004',
      //   changeOrigin: true,
      //   pathRewrite: function(path, req) {
      //     return path
      //   }
      // }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  }
}
