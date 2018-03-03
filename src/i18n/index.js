import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/i18n/messages.js'

// 国际化
Vue.use(VueI18n)

/* eslint-disable no-new */
const i18n = new VueI18n({
  locale: 'en', // 英语
  messages // set locale messages
})

export default i18n
