var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function(_path) {
  var assetsSubDirectory = config.build.assetsSubDirectory
  if (process.env.NODE_ENV === 'app-development') {
    assetsSubDirectory = config.appDev.assetsSubDirectory
  } else if (process.env.NODE_ENV === 'app-production') {
    assetsSubDirectory = config.appProd.assetsSubDirectory
  }
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: ~process.env.NODE_ENV.indexOf('production'),
      autoprefixer: false,
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: {
          sourceMap: options.sourceMap
        }
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass?indentedSyntax'),
    scss: generateLoaders('sass').concat({
      loader: 'sass-resources-loader',
      options: {
        resources: path.resolve(__dirname, '../src/assets/scss/_variables.scss')
      }
    }),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  var output = []
  var loaders = exports.cssLoaders(options)

  for (var extension in loaders) {
    var loader = loaders[extension]
    if (Object.prototype.toString.call(loader) !== '[object Array]') {
      loader = loaders[extension].split('!')
    }

    var isPreProcesser = ['less', 'sass', 'scss', 'stylus', 'styl'].some(function(v) {
      return v === extension
    })

    if (isPreProcesser) {
      // 之前是loader.splice(3, 0, 'postcss') 有错误，应该在sass loader 后,导致karma运行失败 嚓
      loader.splice(-1 - (extension === 'scss'), 0, {
        loader: 'postcss-loader',
        options: {
          plugins: function() {
            return [
              require('autoprefixer')({ browsers: ['last 5 versions'] })
            ]
          }
        }
      })
    }

    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
