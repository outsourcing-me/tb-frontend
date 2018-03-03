// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import { sync } from 'vuex-router-sync'
import '@/common/global_set.js'
import '@/common/pollyfill.js'
import router from '@/router'
import '@/common/resources.js'
import interceptors from '@/common/interceptors.js'
import TbFilters from '@/common/filters.js'
import TbMixins from '@/common/mixins.js'
import TbDirectives from '@/common/directives.js'
// import SimpleVueValidation from 'simple-vue-validator'
import { getReadTime } from '@/common/utils.js'
import i18n from '@/i18n'

import {
  Popup,
  Toast,
  Swipe,
  SwipeItem,
  MessageBox,
  Indicator,
  Progress
} from 'mint-ui'

// 自定义组件
import Header from '@/components/Header.vue'

// vuex化路由
sync(store, router)

// mint-ui 组件

Vue.component(Popup.name, Popup)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Progress.name, Progress)

// 自定义组件
Vue.use(TbFilters)
Vue.use(TbMixins)
Vue.use(TbDirectives)

Vue.component(Header.name, Header)

// 表单验证
// Vue.use(SimpleVueValidation, {
//   templates: i18n.messages[i18n.locale].validatorTemplates
// })

// vue-router 全局配置
Vue.http.options.root = process.env.API_HOST || '/api'

// vue-router拦截器统一注入
interceptors.forEach((v) => {
  Vue.http.interceptors.push(v)
})

// 自定义提示框icon样式
const ToastClasses = {
  'success': 'iconfont icon-chenggong',
  'error': 'iconfont icon-warning',
  'warn': 'iconfont icon-warn'
}

Vue.$msgBox = Vue.prototype.$msgBox = MessageBox
Vue.$toast = Vue.prototype.$toast = function toast(msg = '', type = '') {
  Toast({
    message: msg,
    duration: getReadTime(msg),
    iconClass: type ? ToastClasses[type] : ''
  })
}
Vue.$indicator = Vue.prototype.$indicator = Indicator

// 主要入口函数
function main() {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    i18n,
    template: '<App/>',
    components: { App }
  })
}

// 启动应用
if (process.env.NODE_ENV.indexOf('app') > -1) {
  document.addEventListener('deviceready', e => {
    main()
    window.open = cordova.InAppBrowser.open
    const AppUpdater = require('@/app.updater.js').default

    // 启用热更新
    new AppUpdater({
      root: process.env.APP_MANIFEST_HOST
    })
  })
} else {
  main()
}
