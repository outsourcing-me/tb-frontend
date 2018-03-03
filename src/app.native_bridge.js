import { MessageBox } from 'mint-ui'
import router from '@/router'
import Logger from '@/logger.js'
import i18n from '@/i18n'

const methodInvoke = function(method, params = []) {
  const methods = method.split('.')
  return new Promise((resolve, reject) => {
    cordova.exec(resolve, reject, methods[0], methods[1], params)
  })
}

export default {
  async getPushMessage() {
    const jsonStr = await methodInvoke('Analytics.getPushMessage', [true])
    const json = JSON.parse(jsonStr || '{}')
    Logger.info('***** jsonStr', jsonStr, json)

    if (json.body) {
      Logger.info('***** has msg text', json.body)
      if (json.extra && json.extra.launch_app_url) {
        Logger.info('***** has msg extra', json.extra)
        router.push({
          path: json.extra.launch_app_url
        })
      } else {
        MessageBox({
          title: json.body.title || i18n.t('global.msgBox.title'),
          message: json.body.text || '',
          confirmButtonText: i18n.t('global.msgBox.confirmButtonText')
          // showCancelButton: true,
          // cancelButtonText: '待会看',
          // callback(action) {
          //   if (action === 'confirm') {
          //     router.push({
          //       name: 'messageDetail',
          //       params: {
          //         id:
          //       }
          //     })
          //   }
          // }
        })
      }
    }
  },

  async bindUId(userId = '') {
    await methodInvoke('Analytics.bindUId', [userId])
    Logger.info('***** bindUId success: ', userId)
  },

  async setUId(userId = '') {
    await methodInvoke('Analytics.setUId', [userId])
    Logger.info('***** setUId success: ', userId)
  },

  async subscribeMessage(callback) {
    Logger.info('***** subscribeMessage success')
    await methodInvoke('Analytics.subscribeMessage')
    callback && callback()
    Logger.info('***** subscribeMessage call success')
  }
}
