var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CordovaLoaderManifest = require('./webpack.cordova.manifest.plugin.js')
var env = process.env.NODE_ENV === 'testing' ? require('../config/test.env') : config.appProd.env
var _ = require('lodash')

// 删除base中的图片和字体的loader设置
_.remove(baseWebpackConfig.module.rules, function(rule) {
  return rule.loader === 'url-loader' || rule.loader === 'vue-svg-loader'
})

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.appProd.productionSourceMap,
      extract: true // app
    }).concat([{
      test: /\.(png|jpe?g|gif)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 1000,
        name: utils.assetsPath('img/[name].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
      loader: 'url-loader',
      include: [resolve('src/assets/fonts')],
      query: {
        limit: 1000,
        name: utils.assetsPath('fonts/[name].[ext]')
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
        name: utils.assetsPath('img/[name].[ext]')
      }
    }])
  },
  devtool: config.appProd.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.appProd.assetsRoot,
    publicPath: config.appProd.assetsPublicPath, // app
    // filename: utils.assetsPath('js/[name].[chunkhash].js'),
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[id].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].css')
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing' ? 'index.html' : config.appProd.index,
      template: 'index-app.html',
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CordovaLoaderManifest({})
    // limit chunks count & the count contain the app.js manifest.js vendor.js
    // new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 18 })
  ]
})

if (config.appProd.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.appProd.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.appProd.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
