import i18n from '@/i18n'

export default [ {
  path: '/h5/mine',
  name: 'mine',
  component: resolve => require(['@/views/mine/Index.vue'], resolve),
  meta: {
    title: i18n.t('mine.title.index'),
    headerShow: true
  }
}]
