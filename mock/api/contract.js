const Mock = require('mockjs')

module.exports = router => {
  // 新用户首次创建合同
  router.post('/contracts/initial', (req, res) => {
    res.jsonOk({
      'contractId': '599794a4f87ca703c05df02c',
      'payments': {
        'paymentId': '599794a4f87ca703c05df02d',
        'paymentAmount': 1000.00,
        'bankCardId': '599794a4f87ca703c05df02e',
        'bankCard': '622200000000',
        'bankName': '中国工商银行',
        'repaymentAmount': 1000.00,
        'repaymentDate': '2017-08-28',
        'paymentStatus': 0 // 0 已受理； 1 系统繁忙； 2 支付系统升级；
      }
    })
  })

  // 老用户创建合同
  router.post('/contracts/return', (req, res) => {
    // res.json({
    //   code: 200011 + parseInt(Math.random() * 2, 10),
    //   message: '用户被禁用或者状态异常'
    // })
    res.jsonOk({
      'contractId': '599794a4f87ca703c05df02c',
      'payments': {
        'paymentId': '599794a4f87ca703c05df02d',
        'paymentAmount': 1000.00,
        'bankCardId': '599794a4f87ca703c05df02e',
        'bankCard': '622200000000',
        'bankName': '中国工商银行',
        'repaymentAmount': 1000.00,
        'repaymentDate': '2017-08-28',
        'paymentStatus': 0 // 0 已受理； 1 系统繁忙； 2 支付系统升级；
      }
    })
  })

  router.post('/contracts/update', (req, res) => {
    res.jsonOk({
      'contractId': '599794a4f87ca703c05df02c'
    })
  })

  // 查看合同列表
  router.get('/self/contracts', (req, res) => {
    res.jsonOk({
      'contracts': [{
        'contractId': '599794a4f87ca703c05df02c',
        'contractCreateDate': '2017-08-14 12:00:01',
        'contractStatus': 0,
        'paymentId': '599794a4f87ca703c05df02d',
        'paymentAmount': 1000,
        'paymentDate': '2017-08-14 13:00:02',
        'paymentStatus': 0,
        'bankCardId': '599794a4f87ca703c05df02e',
        'bankCard': '6222000000003333',
        'bankName': '中国工商银行',
        'repaymentId': '599794a4f87ca703c05df02b',
        'repaymentAmount': 1000,
        'repaymentDate': '2017-08-28 14:00:03',
        'repaymentStatus': 0
      }]
    })
  })

  // 查看进行中的合同
  router.get('/self/contracts/:id', (req, res) => {
    res.jsonOk({
      'contractId': '599794a4f87ca703c05df02c',
      'contractCreateDate': '2017-08-14 12:00:01',
      'contractStatus': 0,
      'contractAmount': 999,
      'stillShouldAmount': 1001,
      'paymentId': '599794a4f87ca703c05df02d',
      'paymentAmount': 1000,
      'paymentDate': '2017-08-14 13:00:02',
      'shouldRepaymentDate': '2017-08-14 13:00:02',
      'paymentStatus': 0,
      'idCard': '220122198404162518',
      'productInfo': {
        'id': '599794a4f87ca703c05df02e',
        'amount': 1000.00,
        'loanDays': 14,
        'manageFee': 45.00,
        'creditFee': 25.00,
        'discountAmount': 15.00,
        'loanAmount': 945.00
      },
      'bankReservePhone': '13312331231',
      // 'serviceFee': 56,
      'bankCardId': '599794a4f87ca703c05df02e',
      'bankCard': '6222600910023101987',
      'bankName': '中国工商银行',
      'repaymentId': '599794a4f87ca703c05df02b',
      'repaymentAmount': 1000,
      'repaymentDate': '2017-08-28 14:00:03',
      'repaymentStatus': 0
    })
  })

  // 取消签署合同
  router.get('/contracts/give_up', (req, res) => {
    res.jsonOk({
      'contractId': '599794a4f87ca703c05df02c',
      'contractCreateDate': '2017-08-14 12:00:01',
      'contractStatus': 0,
      'paymentId': '599794a4f87ca703c05df02d',
      'paymentAmount': 1000,
      'paymentDate': '2017-08-14 13:00:02',
      'paymentStatus': 0,
      'idCard': '220122198404162518',
      'bankReservePhone': '13312331231',
      'serviceFee': 56,
      'bankCardId': '599794a4f87ca703c05df02e',
      'bankCard': '6222600910023101987',
      'bankName': '中国工商银行',
      'repaymentId': '599794a4f87ca703c05df02b',
      'repaymentAmount': 1000,
      'repaymentDate': '2017-08-28 14:00:03',
      'repaymentStatus': 0
    })
  })

  // 签署合同
  router.post('/contracts/sign', (req, res) => {
    res.jsonOk({
      'contractId': '599794a4f87ca703c05df02c',
      'contractCreateDate': '2017-08-14 12:00:01',
      'contractStatus': 0,
      'paymentId': '599794a4f87ca703c05df02d',
      'paymentAmount': 1000,
      'paymentDate': '2017-08-14 13:00:02',
      'paymentStatus': 0,
      'idCard': '220122198404162518',
      'bankReservePhone': '13312331231',
      'serviceFee': 56,
      'bankCardId': '599794a4f87ca703c05df02e',
      'bankCard': '6222600910023101987',
      'bankName': '中国工商银行',
      'repaymentId': '599794a4f87ca703c05df02b',
      'repaymentAmount': 1000,
      'repaymentDate': '2017-08-28 14:00:03',
      'repaymentStatus': 0
    })
  })

  // 请求放款
  router.get('/contracts/loan', (req, res) => {
    res.jsonOk({
      message: '请求放款成功'
    })
  })

  // 还款
  router.post('/repayments', (req, res) => {
    res.jsonOk(Mock.mock({
      'repaymentStatus|1': [0, 1, 2] // 0 已受理； 1 系统繁忙； 2 支付系统升级
    }))
  })

  // 还款失败原因
  router.get('/repayment/reason', (req, res) => {
    res.jsonOk(Mock.mock({
      'userBankCard': '622200000000',
      'repaymentReasonCode': 0,
      'repaymentReasonMsg': '',
      'repaymentFail': 1 //当日该银行卡还款失败次数
    }))
  })
}
