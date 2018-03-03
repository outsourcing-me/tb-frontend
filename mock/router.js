// const commonApi = require('./api/common.js')
// const creditApi = require('./api/credit.js')
// const bankApi = require('./api/bank.js')
// const analyticApi = require('./api/analytic.js')
// const contractApi = require('./api/contract.js')
// const messageApi = require('./api/message.js')
// const privilegeApi = require('./api/privilege.js')
const glob = require('glob')
const router = require('express').Router()
const jwt = require('express-jwt')
const SECRET = require('./const.js').SECRET

// 使用jwt 授权
router.use(jwt({
  secret: SECRET,
  credentialsRequired: true, // 是否需要token
  getToken(req) { // 获取token方式
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token']
    } else if (req.query && req.query.token) {
      return req.query.token
    }
    return null
  },
  isRevoked(req, payload, done) { // 判断token是否失效
    const isExpired = Date.now() / 1000 - payload.iat > 86400
    return done(null, isExpired)
  }
}).unless({
  path: [
    '/api/captcha',
    '/api/auth/credentials/client'
  ]
}), (req, res, next) => {
  req.session.captcha = 123456
  res.jsonOk = function(data) {
    res.json({
      code: 0,
      message: 'success',
      data
    })
  }

  next()
})

// 装载接口
// commonApi(router)
// creditApi(router)
// bankApi(router)
// analyticApi(router)
// contractApi(router)
// messageApi(router)
// privilegeApi(router)

// API路由注册
const files = glob.sync(`${__dirname}/api/**/*.js`)
files.forEach(f => {
  let routes = require(f)
  routes(router)
})

// handle token expired err
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.json({
      code: 200003,
      message: '鉴权失败'
    })
  } else {
    next()
  }
})

module.exports = router
