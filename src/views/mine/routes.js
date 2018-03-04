import i18n from '@/i18n'

export default [{
  path: '/h5/mine',
  name: 'mine',
  component: resolve => require(['@/views/mine/Index.vue'], resolve),
  meta: {
    title: i18n.t('mine.title.index'),
    headerShow: true
  }
}, {
  path: '/h5/assets',
  name: 'assets',
  component: resolve => require(['@/views/mine/Assets.vue'], resolve),
  meta: {
    title: i18n.t('mine.title.assets'),
    headerShow: true
  }
}, {
  path: '/h5/record',
  name: 'record',
  component: resolve => require(['@/views/mine/Record.vue'], resolve),
  meta: {
    title: i18n.t('mine.title.record'),
    headerShow: true
  }
}, {
  path: '/h5/history',
  name: 'history',
  component: resolve => require(['@/views/mine/History.vue'], resolve),
  meta: {
    title: i18n.t('mine.title.history'),
    headerShow: true
  }
}, {
  path: '/h5/withdrawal',
  name: 'withdrawal',
  component: resolve => require(['@/views/mine/Withdrawal.vue'], resolve),
  meta: {
    title: i18n.t('mine.title.withdrawal'),
    headerShow: true
  }
}]
