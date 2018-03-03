module.exports = router => {
  // 添加银行卡
  router.post('/bank_cards', (req, res) => {
    const data = req.body
    console.log(req.session.captcha, parseInt(data.captcha, 10))
    if (req.session.captcha !== parseInt(data.captcha, 10)) {
      res.json({
        code: 200002,
        message: '验证码错误'
      })
    } else {
      res.jsonOk({
        'id': '599794a4f87ca703c05df02c'
      })
    }
  })

  // 银行卡列表
  router.get('/bank_cards', (req, res) => {
    res.jsonOk({
      'bankCards': [{
        'id': '599794a4f87ca703c05df02c',
        'bankCard': '622000000000001111',
        'bankName': '中国工商银行',
        'isDefault': true,
        'canDelete': true
      }, {
        'id': '599794a4f87ca703c05df021',
        'bankCard': '622000000000002222',
        'bankName': '中国农业银行',
        'isDefault': false,
        'canDelete': true
      }]
    })
  })

  // 修改默认银行卡
  router.post('/bank_cards/default', (req, res) => {
    res.jsonOk({
      updateResult: 1
    })
  })

  // 查看银行卡开户行
  router.get('/bank_cards/info', (req, res) => {
    if (Math.random() > 0.5) {
      res.jsonOk({
        'bankCard': '62200000000000',
        'bankName': '中国牛鼻银行',
        'bankCode': '92229'
      })
    } else {
      res.json({
        code: 200009,
        message: '银行卡暂不支持'
      })
    }
  })

  // 查看支持的银行卡列表
  router.get('/bank_cards/support_cards', (req, res) => {
    res.jsonOk([
      '中国建设银行',
      '中信银行',
      '中国工商银行',
      '中国银行',
      '上海银行',
      '中国光大银行',
      '平安银行',
      '中国农业银行',
      '中国民生银行',
      '兴业银行',
      '交通银行'
    ])
  })

  // 删除银行卡信息
  router.post('/bank_cards/unbind', (req, res) => {
    res.jsonOk({
      'id': '599794a4f87ca703c05df02c',
      'bankCard': '62200000000000',
      'bankName': '招商银行',
      'isDefault': true,
      'canDelete': false
    })
  })

  // 支持的银行卡列表
  router.get('/bank_cards/support_cards', (req, res) => {
    res.jsonOk([
      '中国建设银行',
      '中信银行',
      '中国工商银行',
      '中国银行',
      '上海银行',
      '中国光大银行',
      '平安银行',
      '中国农业银行',
      '中国民生银行',
      '兴业银行',
      '交通银行'
    ])
  })

  // 单个银行卡信息
  router.get('/bank_cards/:id', (req, res) => {
    res.jsonOk({
      'id': '599794a4f87ca703c05df02c',
      'bankCard': '62200000000000',
      'bankName': '招商银行',
      'isDefault': true,
      'canDelete': false
    })
  })
}
