<template lang="pug">
section.login
  //- div.logo
    img(src='~assets/images/logo.jpg')
    small 免审核借款1000元
  form.login-form(@submit.prevent='submit()')
    .header {{$t('common.login.formTitle')}}
    .fields
      fb-field(type="number", label='', :placeholder='$t("common.login.placeholderPhone")', v-model='user.phone', :state="getFieldState('user.phone')", @click.native="showFieldError($event, 'user.phone')")
        span(slot="label")
          i.iconfont.icon-geren01
      fb-field(type="number", label='', :placeholder='$t("common.login.placeholderCaptcha")', v-model='user.captcha', :state="getFieldState('user.captcha')", @click.native="showFieldError($event, 'user.captcha')")
        span(slot="label")
          i.iconfont.icon-mima
        mt-button.no-border(type='default', @click.stop.prevent='toGetMsgCode()', :disabled='countdownVisible')
          span(v-show='!countdownVisible') {{$t('common.login.getMsgCodeButton')}}
          fb-countdown(ref='fnCountdown', v-show='countdownVisible', @countdown-over='onCountdownOver()')
    .form-buttons
      mt-button.mint-button-block(type='primary', size='large') {{$t('common.login.submit')}}
      //- .note-line
        fb-checkbox(v-model="agreement", :value="false", :state="getFieldState('agreement')")
          span.pl10 我已阅读并同意
          router-link(:to="{name: 'registerAgreement'}")
            |《注册与服务合同》
</template>

<script>
import ValidatorMixin from '@/views/validator_mixin.js'
import CommonMixin from '@/views/common_mixin.js'
import {
  STORE_KEY_LAST_LOGINED_PHONE
} from '@/constants.js'
import {
  mapActions
} from 'vuex'
import { read } from '@/storage'
import store from '@/store'

export default {
  mixins: [CommonMixin, ValidatorMixin],
  validators: {
    'user.phone' (value) {
      return this.validate(value)
        .required(this.$t('validator.required'))
        .digit(this.$t('validator.digit'))
        .regex('^\\d{12}$', this.$t('validator.phone', { length: 12 }))
    },
    'user.captcha' (value) {
      return this.validate(value)
        .required(this.$t('validator.required'))
        .digit(this.$t('validator.digit'))
        .length(6, this.$t('validator.length', { length: 6 }))
    }
  },

  async beforeRouteEnter(to, from, next) {
    if (to.query.accesstoken) {
      (to.query.accesstoken)
      store.dispatch('updateToken', to.query.accesstoken)
      await store.dispatch('getUser')
      next({
        name: to.query.to || 'index'
      })
    } else {
      next()
    }
  },

  mounted() {
    this.redirect = decodeURIComponent(this.$route.query.redirect || '')
    // this.$route.query.openid && (this.user.openid = this.$route.query.openid) // eslint-disable-line
    // this.$route.query.loginType && (this.user.loginType = this.$route.query.loginType) // eslint-disable-line
    this.user.phone = this.$store.getters.user.phone || read(STORE_KEY_LAST_LOGINED_PHONE) || ''
  },

  methods: {
    ...mapActions(['login', 'getUser', 'updateToken']),
    async submit() {
      const success = await this.$validate()
      if (success) {
        const data = await this.login(this.user)
        if (data.code === this.RET_CODE_MAP.OK) {
          // if (process.env.NODE_ENV === 'production' && this.isWeixin() && !data.user.openId) {
          //   // 取得当前地址用于回跳，目前直接使用字符串拼接的方式，
          //   // 是因为web下router用的是history模式，所以如果以后换成hash这里要注意兼容问题
          //   const selfLocation = location.href.replace(/(https?:\/\/[^/]+)\/?.*/, '$1') + this.redirect

          //   // 跳转微信授权获取code
          //   location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.WX_APPID}&redirect_uri=${encodeURIComponent(selfLocation)}&response_type=code&scope=snsapi_base&#wechat_redirect`
          // } else {
          this.$router.push({
            path: this.redirect || '/h5/borrow/bankCard'
          })
          // }
        }
      } else {
        this.$toast(this.validation.firstError(), 'error')
      }
    }
  },

  data() {
    // const NODE_ENV = process.env.NODE_ENV
    return {
      redirect: null, //登录后跳转页面
      agreement: true,
      user: {
        phone: '',
        captcha: ''
        // loginType: this.isWeixin() ? 2 : (~NODE_ENV.indexOf('app') ? 1 : 0)
      }
    }
  }
}
</script>

<style lang="scss">
.login {
  input::-moz-placeholder {
    font-size: $font-size-xl!important;
  }

  input:-ms-input-placeholder {
    font-size: $font-size-xl!important;
  }

  input::-webkit-input-placeholder {
    font-size: $font-size-xl!important;
  }
  .header {
    font-size: $font-size-xxl;
    margin-bottom: 10px;
  }
  .mint-cell-title {
    width: 30px!important;
    .iconfont {
      color: #c0cad8;
      font-size: 20px;
    }
  }
  .mint-cell {
    min-height: 60px;
    &:first-child {
      .mint-cell-wrapper {
        background-image: none;
      }
    }
    &:last-child {
      background-image: linear-gradient(0deg, $border-color, $border-color 50%, transparent 50%);
      background-size: 100% 1px;
      background-repeat: no-repeat;
      background-position: bottom;
    }
  }
  .mint-button {
    height: 44px;
    font-size: $font-size-xl;
  }
  .mint-field-core {
    font-size: $font-size-l;
  }
  .mint-field-other {
    .mint-button {
      height: 35px;
      min-width: 85px;
      margin-left: 3px;
      font-size: $font-size-xs;
    }
  }
  .form-buttons {
    padding: 10px 0;
  }
  .login-form {
    padding: 37px 25px 0;
  }
  .mint-cell-wrapper {
    padding: 0;
    font-size: $font-size-xl;
  }
  .form-buttons {
    margin-top: 37px;
  }
  .note-line {
    color: $minor-font-color;
    font-size: $font-size-s;
    padding: 20px 0;
  }
  .logo {
    background: white;
    text-align: center; // background: white;
    padding: 10px;
    img {
      max-width: 50%;
      max-width: 30vh;
    }
    small {
      display: block;
    }
  }
}
</style>
