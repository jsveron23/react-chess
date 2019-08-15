import * as R from 'ramda'
import _mergeObj from './internal/_mergeObj'
import _mergeTxt from './internal/_mergeTxt'

/**
 * Simple merge
 * @param  {...Object} [...args]
 * @return {Object}
 */
function merge (...args) {
  return R.curry(_mergeObj).apply(null, args)
}

merge.txt = R.curry(_mergeTxt)

export default merge
