var getAppVersion = require('../scripts/app-version.js')

module.exports = {
  NODE_ENV: '"production"',
  WX_APPID: '"wx05a218ccf353acb5"',
  API_HOST: '"/api"',
  APP_VERSION: "'" + getAppVersion() + "'",
  APP_MANIFEST_HOST: '"https://app-static.fnsudai.com"'
}
