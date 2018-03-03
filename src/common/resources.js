import Vue from 'vue'
import VueResource from 'vue-resource'
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
  }
}

const resource = Vue.resource
export const login = resource('login', {}, {}, { _showLoadingStatus: true, ...commonOpts }) // 登录
