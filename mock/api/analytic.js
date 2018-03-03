module.exports = router => {
  // 基础信息统计接口
  router.post('/logs/common', (req, res) => {
    res.jsonOk({
      'id': '599794a4f87ca703c05df02c'
    })
  })

  // 地理位置上报
  router.post('/logs/locations', (req, res) => {
    res.jsonOk({
      'id': '599794a4f87ca703c05df02c' //产生的log id
    })
  })
}
