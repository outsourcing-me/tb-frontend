var _ = require('lodash')

/*将资源文件生成符合cordova-app-loader需要的manifest.json格式*/
function CordovaLoaderManifest(options) {
  this.options = _.merge({
    ignores: [/.*\.map$/],
    manifest: {
      'files': {},
      'load': [
        'static/css/app.css',
        'static/js/manifest.js',
        'static/js/vendor.js',
        'static/js/app.js'
      ],
      'version': ''
    }
  }, options || {})
}

CordovaLoaderManifest.prototype.constructor = CordovaLoaderManifest
CordovaLoaderManifest.prototype.apply = function(compiler) {
  var options = this.options
  compiler.plugin('emit', function(compilation, callback) {
    var manifest = _.cloneDeep(options.manifest)
    for (var filename in compilation.assets) {
      if (!isIgnore(filename, options.ignores)) {
        // 如果已经包含就不要push
        // !~manifest.load.indexOf(filename) && manifest.load.push(filename)
        manifest.files[filename] = {
          version: '',
          filename: filename
        }
      }
    }

    var content = JSON.stringify(manifest)

    // 把它作为一个新的文件资源插入到 webpack 构建中：
    compilation.assets['manifest.json'] = {
      source: function() {
        return content
      },
      size: function() {
        return content.length
      }
    }

    callback()
  })
}

function isIgnore(filename, ignores) {
  return _.some(ignores, function(v) {
    if (_.isString(v)) {
      return filename === v
    } else if (_.isRegExp(v)) {
      return v.test(filename)
    }
    return false
  })
}

module.exports = CordovaLoaderManifest
