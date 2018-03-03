export default {
  layout: {
    backButtonText: 'back'
  },
  // 以下通用模块
  validator: {
    required: 'required',
    digit: 'fill in the numbers',
    length: 'The length requirement is {length} letters',
    phone: 'fill in the {length} phone',
    maxLength: 'Length can not be longer than {length} letters'
  },
  global: {
    networkErr: 'Your network is not connected!',
    401: 'No access!',
    400: 'The request failed! ',
    403: 'Request failed!',
    404: 'Access error! ',
    500: 'Sorry! Server busy. ',
    204: 'Sorry! Information returned incorrect value. ',
    account: {
      stateCodeUnknow: 'Account status unknown! ',
      stateCodeErr: 'Account status is abnormal! '
    },
    toast: {
      success: 'Save successfully'
    },
    msgBox: {
      title: 'prompt',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    }
  },
  updater: {
    confirmMessage: 'There is a new update, update now? ',
    confirmButtonText: 'Update Now',
    cancelButtonText: 'Cancel',
    updateSuccess: 'update successful! ',
    updateFailed: 'update failed! '
  },
  validatorTemplates: {
    error: 'error',
    required: 'required field',
    float: 'must be decimal',
    integer: 'must be an integer',
    number: 'must be a number',
    lessThan: 'Must be less than {0}',
    lessThanOrEqualTo: 'Must be less than or equal to {0}',
    greaterThan: 'Must be greater than {0}',
    greaterThanOrEqualTo: 'must be greater than or equal to {0}',
    between: 'Must be between {0} and {1}',
    size: 'size less than {0}',
    length: 'length less than {0}',
    minLength: 'minimum length {0}',
    maxLength: 'max length {0}',
    lengthBetween: 'Length between {0} and {1}',
    /* beautify ignore: start */
    in: 'must be {0}',
    /* beautify ignore: end */
    notIn: 'can not be {0}',
    match: 'not match',
    regex: 'Wrong format',
    digit: 'must be a number',
    email: 'E-mail format error',
    url: 'url format error',
    optionCombiner: function(options) {
      if (options.length > 2) {
        options = [options.slice(0, options.length - 1).join(','), options[options.length - 1]]
      }
      return options.join('or')
    }
  }
}
