import { read } from '@/storage'
import { STORE_KEY_USER, STORE_KEY_ACCESS_TOKEN } from '@/constants'

export const user = read(STORE_KEY_USER) || ''
export const token = read(STORE_KEY_ACCESS_TOKEN) || ''
  // eslint-disable-next-line camelcase
  // export const refresh_token = read(STORE_KEY_REFRESH_TOKEN) || ''
  // lang order: localStorage -> browser language -> default
  // export const lang = read(STORE_KEY_CONFIG_LANG) || navigator.language || 'zh-CN'
  // export const pageLimit = +read(STORE_KEY_CONFIG_PAGE_LIMIT) || 20
