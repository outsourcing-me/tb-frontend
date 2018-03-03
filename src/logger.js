export default {
  log(...params) {
    if (process.env.NODE_ENV.indexOf('development') > -1) {
      console.log.apply(null, params)
    }
  },
  error(...params) {
    if (process.env.NODE_ENV.indexOf('development') > -1) {
      console.error.apply(null, params)
    }
  },
  info(...params) {
    if (process.env.NODE_ENV.indexOf('development') > -1) {
      console.info.apply(null, params)
    }
  },
  warn(...params) {
    if (process.env.NODE_ENV.indexOf('development') > -1) {
      console.warn.apply(null, params)
    }
  }
}
