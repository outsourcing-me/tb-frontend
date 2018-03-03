export default {
  layout: {
    backButtonText: '返回'
  },
  // 以下通用模块
  validator: {
    required: '必填项',
    digit: '正确填写数字',
    length: '长度要求是{length}位',
    phone: '正确填写{length}位电话',
    maxLength: '长度不能大于{length}个字符'
  },

  global: {
    networkErr: '您的网络没有连接！',
    401: '无访问权限！',
    400: '请求失败！',
    403: '您无此权限！',
    404: '访问错误！',
    500: '抱歉！服务器忙。',
    204: '抱歉！信息返回值不正确。',
    account: {
      stateCodeUnknow: '账户状态未知！',
      stateCodeErr: '账户状态异常！'
    },
    toast: {
      success: '保存成功'
    },
    msgBox: {
      title: '提示',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }
  },
  updater: {
    confirmMessage: '有新的更新，现在更新吗？',
    confirmButtonText: '立即更新',
    cancelButtonText: '取消',
    updateSuccess: '更新成功！',
    updateFailed: '更新失败！'
  },
  validatorTemplates: {
    error: '错误',
    required: '必填项',
    float: '必须是小数',
    integer: '必须是整数',
    number: '必须是数值',
    lessThan: '必须小于{0}',
    lessThanOrEqualTo: '必须小于等于{0}',
    greaterThan: '必须大于{0}',
    greaterThanOrEqualTo: '必须大于等于{0}',
    between: '必须在{0}到{1}之间',
    size: '尺寸小于{0}',
    length: '长度小于{0}',
    minLength: '最小长度{0}',
    maxLength: '最大长度{0}',
    lengthBetween: '长度在{0}和{1}之间',
    /* beautify ignore:start */
    in: '必须是{0}',
    /* beautify ignore:end */
    notIn: '不能是{0}',
    match: '不匹配',
    regex: '错误的格式',
    digit: '必须是数字',
    email: '邮箱格式错误',
    url: 'url格式错误',
    optionCombiner: function(options) {
      if (options.length > 2) {
        options = [options.slice(0, options.length - 1).join(', '), options[options.length - 1]]
      }
      return options.join('或')
    }
  }
}
