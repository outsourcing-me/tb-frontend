module.exports = router => {
  // 获取授权列表
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
          'key': 4,
          'value': '通讯录'
        },
        'isWarranted': true,
        'gainPoints': 100
      }, {
        'warrantType': {
          'key': 5,
          'value': '运营商'
        },
        'isWarranted': false,
        'gainPoints': 60
      }]
    })
  })

  // 查看问题列表
  router.get('/system/questions', (req, res) => {
    res.jsonOk({
      'questions': [{
        'questionType': {
          'key': 1,
          'value': '通讯录'
        },
        'questionList': [{
          'id': '599794a4f87ca703c05df02c',
          'description': 'how do u do'
        }]
      }]
    })
  })

  // 查看问题详情
  router.get('/system/questions/:id', (req, res) => {
    res.jsonOk({
      'id': '599794a4f87ca703c05df02c',
      'description': '',
      'answer': ''
    })
  })

  // 提交问题反馈
  router.post('/suggestions', (req, res) => {
    res.jsonOk({
      'id': '599794a4f87ca703c05df02c' //产生的反馈id
    })
  })

  // 查看问题反馈列表
  router.get('/self/suggestions', (req, res) => {
    res.jsonOk({
      'suggestions': [{
        'id': '599794a4f87ca703c05df02c',
        'status': {
          'key': 1,
          'value': '已处理'
        },
        'content': 'how do u do',
        'createDate': '2017-08-28 12:00:01',
        'processDate': '2017-08-28 12:00:01',
        'remark': 'fine, and u?'
      }]
    })
  })
}
