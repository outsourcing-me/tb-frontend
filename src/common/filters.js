import { isNumber, round, isNull, isNil } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'

export default {
  install(Vue, options) {
    Vue.filter('tbCurrency', (value, prefix = '￥', suffix = '') => {
      if (isNumber(value)) {
        return prefix + numeral(round(value, 2)).format('0,0.00') + suffix
      } else {
        return value
      }
    })

    Vue.filter('tbPercent', (value, decimal = 2, multi = 100, unit = '%') => {
      return isNumber(value) ? round(value * multi, decimal).toFixed(decimal) + (unit || '') : ''
    })

    Vue.filter('tbRound', (value, decimal = 0) => {
      return round(value, decimal).toFixed(2)
    })

    Vue.filter('tbAppend', (value, str) => {
      return (isNil(value) ? '' : value) + str
    })

    Vue.filter('tbPrepend', (value, str) => {
      return str + (isNil(value) ? '' : value)
    })

    Vue.filter('tbPositveNumber', (value) => {
      if (value > 0 && isNumber(value)) {
        return '+' + value
      }
      return value
    })

    Vue.filter('tbNull', (value, str) => {
      return isNull(value) ? '-' : (str || value)
    })

    Vue.filter('tbFalse', (value, str) => {
      return !value ? '-' : (str || value)
    })

    Vue.filter('moment', (date, format) => {
      return moment(date).format(format)
    })

    Vue.filter('numeral', (num, format) => {
      return numeral(num).format(format)
    })
  }
}
