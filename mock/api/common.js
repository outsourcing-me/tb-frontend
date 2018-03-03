const Mock = require('mockjs')
const SECRET = require('../const.js').SECRET
const jwt = require('jsonwebtoken')

module.exports = router => {
  // 获取验证码
  router.get('/captcha', (req, res) => {
    req.session.captcha = Math.random().toString().slice(2, 8)
    res.jsonOk({
      captcha: req.session.captcha
    })
  })

  // 登录
  router.post('/auth/credentials/client', (req, res) => {
    const data = req.body
    // console.log(data, req.session.captcha)
    if (Math.random() >= 0.7) {
      res.json({
        code: 200003 + parseInt(Math.random() * 2, 10),
        message: '用户被禁用或者状态异常'
      })
    } else if (req.session.captcha !== parseInt(data.captcha, 10)) {
      res.json({
        code: 200002,
        message: '验证码错误'
      })
    } else {
      res.jsonOk(Mock.mock({
        token: jwt.sign({ foo: 'bar' }, SECRET)
        // user: {
        //   id: '@guid',
        //   phone: 13312312311,
        //   avatarUrl: '@image("200x100", "#4A7BF7", "Hello")',
        //   'isInvited|1': true,
        //   'isNew|1': true
        // }
      }))
    }
  })

  // 登出
  router.get('/sign_out', (req, res) => {
    res.jsonOk({})
  })

  // 获取用户信息
  router.get('/users/self', (req, res) => {
    res.jsonOk(Mock.mock({
      'id': '599794a4f87ca703c05df02d',
      'phone': '13810000000',
      'name': 'demo',
      'nickname': '昵称', //optional 微信昵称
      'avatarURL': '',
      'isInvited': true, //是否为受邀客户，这儿单纯表示是否被邀请，不考虑邀请是否过期
      'isInviteExpired': true, //若为受邀用户，该邀请是否已过期。非受邀用户该字段无效
      'isNew': true, //是否为新客
      'productInfo': [{
        'id': '599794a4f87ca703c05df02e',
        'amount': 1000.00, //产品合同金额
        'loanDays': 14, //产品放款期限，天
        'serviceFee': 56.00, //服务费用
        'discountAmount': 16.00, //优惠费用
        'loanAmount': 1000.00 //实际放款金额，暂定服务费后收，现在等于合同金额
      }],
      'privilegeInfo': {
        'creditPoints': 1203, //当前积分
        'currentLimit': 1203, //当前额度
        'currentLevel': 1, //当前积分等级
        'nextLevelPoints': 1500, //下一级所需积分
        'nextLimit': 1500, // 下一额度
        'nextLevel': 2 //下一积分等级
      },
      'couponCount': 2, // 优惠券张数
      'systemMsgUnread': 10, //未读系统消息数
      'personalMsgUnread': 20, //未读个人消息数
      'currentOngoingContract': { //optional 当前正在进行的合同
        'id': '599794a4f87ca703c05df02e',
        'currentContractStatus': {
          'key': 106,
          'value': '待还款'
        }
      }
      // 用户状态和合同状态合并后的类型映射
      // CONTRACT_INFO_FILLED: '101', // 合同信息完成，带签署
      // LOANING: '102', // 放款中
      // LOAN_FAILED: '103', // 放款失败
      // REPAYING: '104', // 还款中
      // REPAY_FAILED: '105', // 还款失败
      // DEBT_SETTELED: '106', // 借款结清
      // DEBT_NOT_SETTLED: '107', // 借款未结清
      // FIRST_BORROWER: '108', // 首次借款
    }))
  })

  // 信息完善度
  router.get('/users/information/percent', (req, res) => {
    res.jsonOk({

    })
  })

  // 验证旧手机号验证码
  router.post('/verify/old_phone', (req, res) => {
    const data = req.body
    if (req.session.captcha !== parseInt(data.captcha, 10)) {
      res.json({
        code: 200002,
        message: '验证码错误'
      })
    } else if (data.verifyType === '1' && !data.bankCardId) {
      res.json({
        code: 200007,
        message: '参数校验错误'
      })
    } else {
      res.jsonOk({})
    }
  })

  // 变更手机号
  router.post('/change/phone', (req, res) => {
    const data = req.body
    if (req.session.captcha !== parseInt(data.captcha, 10)) {
      res.json({
        code: 200002,
        message: '验证码错误'
      })
    } else if (data.verifyType === '1' && !data.bankCardId) {
      res.json({
        code: 200007,
        message: '参数校验错误'
      })
    } else {
      res.jsonOk({})
    }
  })

  // 请求授权
  router.post('/grant/invite', (req, res) => {
    res.jsonOk({})
  })

  // 请求授权
  router.post('/fe_statistics', (req, res) => {
    res.jsonOk({})
  })
}
