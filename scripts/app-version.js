const path = require('path')
const fs = require('fs')
var chalk = require('chalk')

// const config = path.resolve(__dirname, '../../tbj-app/config.xml')
// const configData = fs.readFileSync(config, 'utf8')
// const matches = configData.match(/id="org\.apache\.cordova\.hummingBird" version="([0-9.]+)"/)
// const version = matches[1] || 'unknown'
// console.log(chalk.green('get app version:' + version))

const version = 'unknown'
module.exports = function getAppVersion() {
  return version.replace(/\./g, '_')
}
