var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  externals: [
    require('webpack-require-http')
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json', '.jpg', '.png', '.jpeg', '.scss'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      '@': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components')
    }
  },
  module: {
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src'), resolve('test')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src'), resolve('test')]
    }, {
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      loaders: [{
        loader: 'image-webpack-loader',
        query: {
          mozjpeg: {
            progressive: true
          },
          optipng: {
            optimizationLevel: 7
          },
          gifsicle: {
            interlaced: false
          },
          pngquant: {
            quality: '65-90',
            speed: 4
          }
        }
      }]
    }, {
      test: /\.(png|jpe?g|gif|wav)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 1000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
      loader: 'url-loader',
      include: [resolve('src/assets/fonts')],
      query: {
        limit: 1000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(apk)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 1000,
        name: utils.assetsPath('download/[name].[ext]')
      }
    }, {
      test: /\.svg$/,
      loader: 'vue-svg-loader',
      include: [resolve('src/assets/icons')],
      query: {
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    }]
  }
}
