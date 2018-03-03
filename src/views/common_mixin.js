import { mapActions } from 'vuex'
import { get } from 'lodash'

export default {
  methods: {
    ...mapActions(['getMsgCode']),
    // 获取验证码
    async toGetMsgCode() {
      const success = await this.$validate(this.validatePhoneModel)
      if (success) {
        const data = await this.getMsgCode({
          phone: get(this, this.validatePhoneModel),
          label: this.$route.meta.captchaSendType || ''
        })
        if (data.code === this.RET_CODE_MAP.OK) {
          this.countdownVisible = true
          this.$refs.fnCountdown.start()
        }
      } else {
        this.$toast(this.validation.firstError(this.validatePhoneModel), 'error')
      }
    },

    // 定时器结束 隐藏定时器
    onCountdownOver() {
      this.countdownVisible = false
    }
  },

  // watch: {
  //   // 空格分隔的银行卡号
  //   'bankCardForShow' () {
  //     this.model.bankCard = this.bankCardForShow = this.bankCardForShow.replace(/\s/g, '')
  //     this.bankCardForShow = this.bankCardForShow.replace(/\d{4}(?=(\d{1,4}))/g, '$& ') //展示空格分隔的银行卡号
  //   },
  //   'model.bankCard' () {
  //     this.bankCardNotSupported = false // 重新输入银行卡后，不支持的状态重置为false，避免影响到再次获取银行卡信息的逻辑
  //   }
  // },

  data() {
    return {
      // bankCardForShow: '',
      // bankCardNotSupported: false,
      validatePhoneModel: 'user.phone', // 获取验证码前验证手机号
      countdownVisible: false
    }
  }
}
