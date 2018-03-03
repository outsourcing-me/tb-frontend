import store from '@/store'
import { merge } from 'lodash'

// 记录路由是否是通过history.back方式
window.addEventListener('popstate', (ev) => {
  let direction = 'forward'
  const currentState = store.getters.currentState
  if (currentState.index && ev.state && ev.state.index >= currentState.index) {
    direction = 'backward'
  }
  store.commit('updateTransitionName', direction === 'forward' ? 'slideLeftFade' : 'slideRightFade')
  store.commit('updateIsPopStated', true)
  ev.state && store.commit('updateCurrentStateIndex', ev.state.index)
  console.log('popstate', ev.state)
})

// 激活ios设备上面css的active效果
document.body.addEventListener('touchstart', () => {})

// 避免bfcache导致的问题
window.onpageshow = function(event) {
  if (event.persisted) {
    window.location.reload()
  }
}

// 增强history
const oldHistoryPush = window.history.pushState
let historyLength = window.history.length
if (oldHistoryPush) {
  window.history.pushState = function(state = {}, name, url) {
    historyLength = historyLength + 1
    store.commit('updateCurrentStateIndex', historyLength)
    oldHistoryPush.call(window.history, merge(state, { index: historyLength }), name, url)
    console.log('push state', state)
  }
}
