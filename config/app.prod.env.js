var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"app-production"',
  API_HOST: '"https://pub.fnsudai.com/api"'
  // APP_MANIFEST_HOST: '"http://core-test.fnsudai.com"'
})
