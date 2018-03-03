import Hammer from 'hammerjs'
import { indexOf, each, keys } from 'lodash'

export default {
  install(Vue, options) {
    const gestures = ['tap', 'pan', 'pinch', 'press', 'rotate', 'swipe']
    const directions = {
      tap: ['tap'],
      swipe: ['swipeleft', 'swiperight', 'swipeup', 'swipedown'],
      pan: ['panstart', 'panmove', 'panend', 'pancancel', 'panleft', 'panright', 'panup', 'pandown'],
      pinch: ['pinchstart', 'pinchmove', 'pinchend', 'pinchcancel', 'pinchin', 'pinchout'],
      press: ['press', 'pressup'],
      rotate: ['rotatestart', 'rotatemove', 'rotateend', 'rotatecancel']
    }

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
    let hm = null // hammer manager
    let handler = null // touch事件处理函数
    let evtType = '' // event type
    // let detailEvts = []

    // 让 mint-ui field 支持blur事件
    Vue.directive('mt-field-blur', {
      bind(el, binding) {
        el.querySelector('input').addEventListener('blur', binding.value.blur)
      },
      unbind(el, binding) {
        el.querySelector('input').removeEventListener('blur', binding.value.blur)
      }
    })

    // hammerjs 封装
    Vue.directive('touch', {
      bind(el, binding) {
        if (!hm) {
          hm = new Hammer.Manager(el, {
            touchAction: 'pan-y'
          })
        }
        evtType = binding.arg.toLowerCase()
        let index = indexOf(gestures, evtType)

        if (index < 0) {
          console.warn('[vue2-touch] event type value is invalid')
          return
        }

        if (typeof binding.value !== 'function') {
          handler = null
          console.warn('[vue2-touch] invalid args value for v-touch, please check it')
          return
        }
        hm.add(new Hammer[capitalize(evtType)]())
        // bind function
        let evtsArray = keys(binding.modifiers)
        if (!evtsArray.length) evtsArray = directions[evtType]
        if (handler) {
          each(evtsArray, function(et) {
            hm.off(et)
          })
        }
        if (typeof binding.value === 'function') {
          handler = binding.value
          each(evtsArray, function(et) {
            hm.on(et, function(e) {
              if (e.target.hasAttribute('disable-swipe') || e.target.closest('[disable-swipe]')) return
              handler(et, e)
            })
          })
        }
      },
      unbind() {
        hm.destroy()
        hm = null
      }
    })
  }
}
