module.exports = router => {

  // 用户个人消息列表
  router.get('/self/messages', (req, res) => {
    res.jsonOk({
      'messages': [{
        'id': '599794a4f87ca703c05df02c',
        'messageType': {
          'key': 1,
          'value': '放款成功'
        },
        'createDate': '2017-08-28 23:00:00',
        'content': '描述',
        'isRead': false //是否已读： false 未读；true 已读
      }, {
        'id': '599794a4f87ca703c05df02d',
        'messageType': {
          'key': 2,
          'value': '自动还款成功'
        },
        'createDate': '2017-08-28 22:00:00',
        'content': '描述',
        'isRead': true //是否已读： false 未读；true 已读
      }]
    })
  })

  // 单个个人消息详情
  router.get('/self/messages/:id', (req, res) => {
    res.jsonOk({
      'id': '599794a4f87ca703c05df02c',
      'messageType': {
        'key': 1,
        'value': '免息券'
      },
      'createDate': '2017-08-28 23:00:00',
      'content': '',
      'isRead': false
    })
  })

  // 用户系统消息列表
  router.get('/system/messages', (req, res) => {
    res.jsonOk({
      'messages': [{
        'id': '599794a4f87ca703c05df02c',
        'messageType': {
          'key': 1,
          'value': '系统类型1'
        },
        'createDate': '2017-08-28 23:00:00',
        'content': '描述',
        'isRead': false //是否已读： false 未读；true 已读
      }]
    })
  })

  // 单个系统消息详情
  router.get('/system/messages/:id', (req, res) => {
    res.jsonOk({
      'id': '599794a4f87ca703c05df02c',
      'messageType': {
        'key': 1,
        'value': '免息券'
      },
      'createDate': '2017-08-28 23:00:00',
      'content': '',
      'isRead': false
    })
  })
}
