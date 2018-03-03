module.exports = router => {
  // 通用信用特权列表
  router.get('/system/privileges', (req, res) => {
    res.jsonOk({
      'privileges': [{
        'level': 1,
        'minPoint': 1000,
        'maxPoint': 1199,
        'limitAmount': 1000.00,
        'description': '免审免息',
        'estimatePercentage': 12.00
      }, {
        'level': 2,
        'minPoint': 1200,
        'maxPoint': 1499,
        'limitAmount': 1200.00,
        'description': '积分加速',
        'estimatePercentage': 24.00
      }]
    })
  })

  // 用户积分变化列表
  router.get('/self/point_changes', (req, res) => {
    res.jsonOk({
      'currentPoints': 1561,
      'pointChangeRecords': [{
        'id': '599794a4f87ca703c05df02c',
        'changeType': {
          'key': 1,
          'value': '还款'
        },
        'changeDate': '2017-08-28 12:00:00',
        'pointChnanged': 2,
        'pointAccumulated': 1561
      }, {
        'id': '599794a4f87ca703c05df02d',
        'changeType': {
          'key': 2,
          'value': '通讯录授权'
        },
        'changeDate': '2017-08-28 11:00:00',
        'pointChnanged': 2,
        'pointAccumulated': 1559
      }]
    })
  })

  // 优惠券列表
  router.get('/self/coupons', (req, res) => {
    res.jsonOk({
      'coupons': [{
        'id': '599794a4f87ca703c05df02c',
        'couponType': {
          'key': 1,
          'value': '免息券'
        },
        'expireDate': '2017-08-28',
        'amount': 5.00,
        'description': '',
        'status': {
          'key': 1,
          'value': '未使用'
        }
      }, {
        'id': '599794a4f87ca703c05df02d',
        'couponType': {
          'key': 2,
          'value': '免服务费券'
        },
        'expireDate': '2017-08-26',
        'amount': 5.00,
        'description': '',
        'status': {
          'key': 2,
          'value': '已使用'
        }
      }]
    })
  })

  // 授权信息列表
  router.get('/self/warrants', (req, res) => {
    res.jsonOk({
      'basicWarrants': [{
        'warrantType': {
          'key': 1,
          'value': '手机号'
        },
        'isWarranted': true,
        'gainPoints': 100
      }],
      'optionalWarrants': [{
        'warrantType': {
          'key': 1,
          'value': '通讯录'
        },
        'isWarranted': true,
        'gainPoints': 100
      }, {
        'warrantType': {
          'key': 2,
          'value': '运营商'
        },
        'isWarranted': false,
        'gainPoints': 60
      }, {
        'warrantType': {
          'key': 3,
          'value': '学信网'
        },
        'isWarranted': true,
        'gainPoints': 60
      }, {
        'warrantType': {
          'key': 4,
          'value': '简版政信'
        },
        'isWarranted': false,
        'gainPoints': 60
      }, {
        'warrantType': {
          'key': 5,
          'value': '京东'
        },
        'isWarranted': false,
        'gainPoints': 60
      }]
    })
  })
}
