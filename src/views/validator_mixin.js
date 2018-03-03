import SimpleVueValidation from 'simple-vue-validator'
const Validator = SimpleVueValidation.Validator

export default {
  methods: {
    Validator,
    validate: Validator.value,
    getFieldState(field) {
      if (this.validation.hasError(field)) {
        return 'error'
      } else if (this.validation.isPassed(field)) {
        return 'success'
      }
      return ''
    },
    showFieldError(event, field) {
      const et = event.target
      console.log(event)
      if (et.classList.contains('mintui-field-error') && et.parentNode.classList.contains('mint-field-state')) {
        this.$toast(this.validation.firstError(field), 'error')
      }
    }
  }
}
