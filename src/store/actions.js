import router from '@/router'
import { login, userSelf } from '@/common/resources.js'
import * as Storage from '@/storage'
import {
  STORE_KEY_USER,
  STORE_KEY_ACCESS_TOKEN,
  RET_CODE_MAP,
  STORE_KEY_LAST_LOGINED_PHONE
} from '@/constants'
// import { each } from 'lodash'

export default {
  updateUser: function({ commit }, user = {}) {
    Storage.save(STORE_KEY_USER, JSON.stringify(user))
    commit('updateUser', user)
  },

  updateToken({ commit }, token = '') {
    Storage.save(STORE_KEY_ACCESS_TOKEN, token)
    commit('updateToken', token)
  },

  // 获取用户信息
  async getUser({ commit, dispatch }, params = {}) {
    const res = await userSelf.get(params).then(res => res.json())
    if (res.code === RET_CODE_MAP.OK) {
      const user = res.data
      await dispatch('updateUser', user)
    }
    return res
  },

  async login({ commit, dispatch }, user) {
    let res = await login.save({}, user).then(res => res.json())
    if (res.code === RET_CODE_MAP.OK) {
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
