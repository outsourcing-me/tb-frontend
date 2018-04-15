import router from '@/router'
import { login, userInfo, gameToken } from '@/common/resources.js'
import * as Storage from '@/storage'
import {
  STORE_KEY_USER,
  STORE_KEY_ACCESS_TOKEN,
  STORE_KEY_GAME_TOKEN,
  RET_CODE_MAP,
  SOUND_SWITCH,
  STORE_KEY_LAST_LOGINED_PHONE
} from '@/constants'
// import { each } from 'lodash'

export default {
  updateUser: function({ commit }, user = {}) {
    Storage.save(STORE_KEY_USER, JSON.stringify(user))
    commit('updateUser', user)
  },

  updateSoundSwitch({ commit }, soundSwitch = '') {
    Storage.save(SOUND_SWITCH, soundSwitch)
    commit('updateSoundSwitch', soundSwitch)
  },

  updateToken({ commit }, token = '') {
    Storage.save(STORE_KEY_ACCESS_TOKEN, token)
    commit('updateToken', token)
  },

  updateGameToken({ commit }, token = '') {
    Storage.save(STORE_KEY_GAME_TOKEN, token)
    commit('updateGameToken', token)
  },

  // 获取用户信息
  async getUser({ commit, dispatch }, params = {}) {
    const res = await userInfo.save(params).then(res => res.json())
    if (res.code === RET_CODE_MAP.OK) {
      const user = res.data
      await dispatch('updateUser', user)
    }
    return res
  },

  // 获取房间token
  async getGameToken({ commit, dispatch }, params = {}) {
    const res = await gameToken.save(params).then(res => res.json())
    if (res.code === RET_CODE_MAP.OK) {
      const token = res.data
      await dispatch('updateGameToken', token)
    }
  },

  async login({ commit, dispatch }, user) {
    let res = await login.save({}, user).then(res => res.json())
    if (res.code === RET_CODE_MAP.OK) {
      await dispatch('getGameToken')
      await dispatch('updateToken', res.data.token)
      const user = await dispatch('getUser')
      if (res.data.user) user.openId = res.data.user.openId
      res.user = user
    }
    return res
  },

  logout({ commit, state }, silent) {
    Storage.clearMulti([STORE_KEY_USER, STORE_KEY_ACCESS_TOKEN])
    Storage.save(STORE_KEY_LAST_LOGINED_PHONE, state.user.phone || '')
    commit('updateUser', { phone: state.user.phone })
    commit('updateToken')

    if (silent) return

    router.push({
      name: 'login'
    })
  }
}
