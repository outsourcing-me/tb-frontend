import i18n from '@/i18n'

export default [{
  path: '/',
  redirect: { name: 'index' }
}, {
  path: '/h5/index',
  name: 'index',
  component: resolve => require(['@/views/common/Index.vue'], resolve),
  meta: {
    title: i18n.t('common.title.index'),
    headerShow: true
  }
}, {
  path: '*',
  redirect: '/'
}]
