import Vue from 'vue'
import { includes, isObject, isFunction } from 'lodash'
import { Indicator } from 'mint-ui'
import store from '@/store'
import { read, save } from '@/storage'
import { RET_CODE_MAP } from '@/constants.js'
import moment from 'moment'
import i18n from '@/i18n'
// import MessageBox from '@/common/custom_msgbox.js'
import MessageBox from '@/common/custom_msgbox.js'

const msgBox = function(message) {
  MessageBox({
    // title: i18n.t('global.msgBox.title'),
    message
    // confirmButtonText: i18n.t('global.msgBox.confirmButtonText')
  })
}
// import msgBox from '@/common/custom_msgbox.js'

const CACHE_URLS = [] // 需要缓存的接口
const requestMap = {} // 请求地址
let indicatorHandle = 0

export default [
  // app网络检查
  function(request, next) {
    if (~process.env.NODE_ENV.indexOf('app')) {
      if (!navigator.onLine) {
        const payload = { 'message': i18n.t('global.networkErr') }
        next({
          status: 400,
          ok: false,
          headers: {
            Date: new Date()
          },
          statusText: 'OK',
          data: payload,
          body: payload,
          json() {
            return payload
          }
        })
      } else {
        next()
      }
    } else {
      next()
    }
  },
  // 请求超时
  function(request, next) {
    let timeout
    if (request._timeout) { // 超时自定义
      timeout = setTimeout(() => {
        if (request.onTimeout) request.onTimeout(request)
        request.abort()
      }, request._timeout)
    }

    if (request.params._showLoadingStatus === undefined && request._showLoadingStatus) { // 是否显示loading状态
      Indicator.open({ spinnerType: 'double-bounce' })
      clearTimeout(indicatorHandle)
    }

    next(res => {
      clearTimeout(timeout)
      indicatorHandle = setTimeout(() => {
        Indicator.close()
      }, 300)
    })
  },
  // 控制重复请求
  function(request, next) {
    // console.log(request)
    let key
    // abort the same post request
    if (/POST|PUT|DELETE/.test(request.method)) {
      key = `${request.method}${request.url}${JSON.stringify(request.params)}`
      // abort the existed request
      if (key && requestMap[key]) {
        key = null
        setTimeout(() => {
          request.abort()
        })
      } else {
        requestMap[key] = request
      }
    }

    request.headers.set('x-auth-token', store.getters.token)

    next((response) => {
      // delete current request in the map
      if (key) {
        delete requestMap[key]
      }
    })
  },
  // 缓存接口
  function(request, next) {
    let key = Vue.url(request.url, request.params)
    request.cache = includes(CACHE_URLS, key.split('?')[0])

    if (!request.params.no_cache && read(key)) {
      next({
        status: 200,
        ok: true,
        headers: {
          Date: new Date()
        },
        statusText: 'OK',
        data: read(key) || '{}',
        body: read(key) || '{}',
        json() {
          return JSON.parse(read(key) || '{}')
        }
      })
    } else {
      next()
    }
  },
  // 状态码
  function(request, next) {
    next((res) => {
      const date = isFunction(res.headers.get) ? res.headers.get('Date') : new Date()
      store.commit('updateNow', moment(date).toDate())
      if (res.status === 419 || res.status === 401) {
        if (request.params.skipAuth) {
          store.dispatch('logout', true)
        } else {
          msgBox(res.body.message || i18n.t('global.401'))
          store.dispatch('logout')
        }
      } else if (res.status === 400) {
        msgBox(res.body.message || i18n.t('global.400'))
      } else if (res.status === 403) {
        msgBox(res.body.message || i18n.t('global.403'))
      } else if (res.status === 404) {
        msgBox(res.body.message || i18n.t('global.404'))
      } else if (res.status === 500 || res.status === 502) {
        msgBox(res.body.message || i18n.t('global.500'))
      } else if (res.status === 200) { // 使用body内的code来执行逻辑，上面的http status 先保留
        if (!request.notApi && !request.params.skipAuth && (!res.body || res.body.code !== RET_CODE_MAP.OK)) {
          msgBox(res.body.message || i18n.t('global.204'))
        } else {
          if (request.cache) { // 缓存需要缓存的接口
            let key = Vue.url(request.url, request.params)
            let body = isObject(res.body) ? JSON.stringify(res.body) : res.body
            save(key, body)
          }
        }
      }
    })
  }
]
