import Vue from 'vue'
import { each } from 'lodash'
import i18n from '@/i18n'

function removeOldMsgBox() {
  each(document.querySelectorAll('.custom-msgbox'), v => {
    v && v.remove()
  })
}

export default function(data = {}, callback) {
  removeOldMsgBox()
  if (!callback) callback = data.callback || null
  /* eslint-disable no-new */
  return new Vue({
    el: document.createElement('div'),
    template: `<tb-msgbox ref="msgBox"  :msgbox-class="classes" :showCancelButton="false">
                <h3 slot="title" v-html="title"></h3>
                <div>
                  <p v-html="message"></p>
                </div>
                <div slot="confirmButtonContent">{{confirmButtonText}}</div>
                <div slot="note" @click="$emit('note-click')" v-html="note"></div>
              </tb-msgbox>`,

    data() {
      return Object.assign({
        classes: ['custom-msgbox'],
        title: i18n.t('global.msgBox.title'),
        message: '',
        note: '',
        confirmButtonText: i18n.t('global.msgBox.confirmButtonText')
      }, data)
    },
    mounted() {
      document.body.appendChild(this.$el)
      this.$refs.msgBox.open(action => {
        if (callback) callback(action)
      })
    }
  })
}
