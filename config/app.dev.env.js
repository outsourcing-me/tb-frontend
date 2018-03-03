var merge = require('webpack-merge')
var prodEnv = require('./dev.env')
var getIPV4 = require('../scripts/ip-getter.js')
var ip = getIPV4()[0]

module.exports = merge(prodEnv, {
  NODE_ENV: '"app-development"',
  API_HOST: '"http://core-test.fnsudai.com/api"',
  // APP_MANIFEST_HOST: '"http://' + (ip || 'localhost') + ':8000/"'
  APP_MANIFEST_HOST: '"http://app-static-test.fnsudai.com/"'
})
