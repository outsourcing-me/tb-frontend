import { cloneDeep, isNull, each, isArray, includes } from 'lodash'

// 清理无用参数
export function pruneParams(params, specialInclude) {
  var newParams = cloneDeep(params)
  each(newParams, (v, i) => {
    if (!specialInclude) {
      if (newParams[i] === '' || isNull(newParams[i])) delete newParams[i]
    } else if (isArray(specialInclude)) {
      if (!includes(specialInclude, i)) delete newParams[i]
    }
  })
  return newParams
}
