import * as R from 'ramda'
import _isEmpty from './internal/_isEmpty'

/**
 * Is value empty?
 * @param  {*}       v
 * @return {Boolean}
 */
function isEmpty (v) {
  return R.isEmpty(v) || R.isNil(v)
}

isEmpty.and = _isEmpty('every')
isEmpty.or = _isEmpty('some')
isEmpty.lazy = R.thunkify(isEmpty)

export default isEmpty
