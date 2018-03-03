import {trim} from 'lodash'
export function toQueryString(obj, encode) { // 写成function 否则格式化代码有问题
  let parts = []
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (encode) {
        parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]))
      } else {
        parts.push(i + '=' + obj[i])
      }
    }
  }
  return parts.join('&')
}

export function uniqeId(length) {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export function isWeixin() {
  let ua = navigator.userAgent.toLowerCase()
  if (ua.match(/.*MicroMessenger/i)) {
    return true
  }
  return false
}

// 根据文字长度判断阅读时间
export function getReadTime(text) {
  let time = 1000 // 默认1000ms
  if (text.length <= 10) {
    time = 1500
  } else if (text.length > 10) {
    time = Math.min(text.length * 100 + 500, 4000)
  }
  return time
}

//验证账号是否为字母或数字
export function isAccount(value) {
  if (value === null || value === '') {
    return false
  }
  return (/^[A-Za-z0-9]{6,24}$/).test(trim(value))
}

//验证银行卡
export function isBankCard(value) {
  if (value === null || value === '') {
    return false
  }
  return (/^\d{16,19}$/).test(trim(value))
}

//验证是否是中文
export function isChineseName(value) {
  if (value === null || value === '') {
    return false
  }
  return (/^([\u4e00-\u9fa5]){2,15}$/).test(trim(value))
}

//判断输入的是否为数字金额
export function isAmount(value) {
  if (value === null || value === '') {
    return false
  }
  return (/^(([0-9]+\.[0-9]{2}))$/).test(trim(value))
}

//判断输入的是否有非法字符
export function isIllegal(value) {
  if (value === null || value === '') {
    return false
  }
  return (/^[^%&',;=?$\x22]+$/).test(trim(value))
}

//验证是否是中国手机号码
export function isMobile(value) {
  if (value === null || value === '') {
    return false
  }
  var mobile = (value + '').trim()
  return (/^1[3|5|8|4|7]\d{9}$/).test(mobile)
}

//验证码数字字母验证
export function isCode(value) {
  if (value === null || value === '') {
    return false
  }
  return (/^[0-9A-Za-z]{4}$/).test(trim(value))
}

//手机验证码四位数字
export function isPhoneCode(value) {
  if (value === null || value === '') {
    return false
  }
  return (/^[0-9]{4}$/).test(trim(value))
}

//验证字符串是否是二代18位身份证
export function isIdcard(value) {
  if (value === null || value === '') {
    return false
  }
  if (getStringTrueLength(value) !== 18) {
    return false
  }

  const jqyz = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const vcode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

  let jssum = 0
  for (let i = 0; i < getStringTrueLength(value) - 1; i++) {
    jssum += new Number(value[i]) * jqyz[i] // eslint-disable-line
  }

  return (value[17]) === (vcode[jssum % 11])
}

//取得字符串真实长度
export function getStringTrueLength(str) {
  return String(str).replace(/[^\x00-\xff]/g, 'xx').length
}

//整数数字
export function isInteger(value) {
  if (value === null || value === '') {
    return false
  }
  return (/^[0-9]{1,19}$/).test(trim(value))
}
