import Vue from 'vue'
import VueResource from 'vue-resource'
import store from '@/store'
Vue.use(VueResource)

const previousRequestMap = {}
const commonOpts = {
  // emulateJSON: true,
  before(request) {
    const key = Vue.url(request.url, request.params)
    console.log('ajax request key is : ', key)
    if (previousRequestMap[key]) {
      previousRequestMap[key].abort()
    }

    previousRequestMap[key] = request
    const body = request.body ? JSON.parse(request.body) : {}
    body.token = store.getters.token
    body.userid = store.getters.user.userid || ''
    request.body = JSON.stringify(body)
  }
}

const resource = Vue.resource
export const login = resource('login', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 登录
export const userInfo = resource('user/info', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 用户信息
export const roomList = resource('room/list', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 房价列表
export const bannerList = resource('banner', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 轮播图
export const coinLog = resource('user/coin_log', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 提现记录
export const winPrize = resource('user/win_prize', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 消耗中奖记录
