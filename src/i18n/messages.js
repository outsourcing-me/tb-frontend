import { each, merge } from 'lodash'
import ch from '@/i18n/global/ch.js'
import en from '@/i18n/global/en.js'

const messages = { ch, en }

// views
const msgViewContext = require.context('../views', true, /i18n\/.+\.js$/)
each(msgViewContext.keys(), key => {
  const message = msgViewContext(key).default
  if (~key.indexOf('ch.js')) {
    merge(messages.ch, message)
  } else if (~key.indexOf('en.js')) {
    merge(messages.en, message)
  }
})

// components
const msgCmpntsContext = require.context('../components', true, /i18n\/.+\.js$/)
each(msgCmpntsContext.keys(), key => {
  const message = msgCmpntsContext(key).default
  if (~key.indexOf('ch.js')) {
    merge(messages.ch, message)
  } else if (~key.indexOf('en.js')) {
    merge(messages.en, message)
  }
})

export default messages
