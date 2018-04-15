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
export const gameToken = resource('user/token', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 获取房间token
export const coinAssets = resource('user/coin_assets', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 获取余额
export const coinUse = resource('user/coin_use', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 消耗金币
export const coinUseCallback = resource('user/coin_use_callback', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 消耗金币回调
export const coinLog = resource('user/coin_log', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 提现记录
export const coinUseLog = resource('user/coin_use_log', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 消耗中奖记录
export const roomList = resource('room/list', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 房间列表
export const roomInfo = resource('room/info', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 房间信息
export const roomDetail = resource('room/detail', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 房间详情
export const bannerList = resource('banner', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 轮播图
// export const winPrize = resource('user/win_prize', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 消耗中奖记录
export const chat = resource('user/chat_submit', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 消耗中奖记录
export const enterRoomLog = resource('room/enterUser', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 消耗中奖记录
export const quitRoomLog = resource('room/quitUser', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 消耗中奖记录
