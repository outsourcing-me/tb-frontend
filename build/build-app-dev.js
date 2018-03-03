// https://github.com/shelljs/shelljs
require('./check-versions')()

process.env.NODE_ENV = 'app-development'

var ora = require('ora')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.dev.app.conf')

var spinner = ora('building for development...')
spinner.start()

var assetsPath = path.join(config.appDev.assetsRoot, config.appDev.assetsSubDirectory)
console.log(assetsPath)
shell.rm('-rf', assetsPath)
shell.mkdir('-p', assetsPath)
shell.config.silent = true
// shell.cp('-R', 'static/*', assetsPath)
shell.config.silent = false

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  // 拷贝当前生成的app资源文件到app所在项目的www目录，供自动更新用
  shell.exec('npm run manifest')
  var appAssetsPath = path.join(config.appProd.assetsRoot, '../..', 'tbj-app/www')
  shell.rm('-rf', appAssetsPath)
  shell.mkdir('-p', appAssetsPath)
  shell.cp('-Rf', config.appProd.assetsRoot + '/*', appAssetsPath)
  shell.rm('-rf', appAssetsPath + '/*.apk') // 删除下载的apk
  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.cyan(
    '  Tip: built files are meant to be served for app.\n' +
    '  Opening index.html will work.\n'
  ))
})
