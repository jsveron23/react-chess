import * as R from 'ramda'
import _isExist from './internal/_isExist'

/**
 * Is value exist?
 * @param  {*}       v
 * @return {Boolean}
 */
function isExist (v) {
  return !(R.isEmpty(v) || R.isNil(v))
}

isExist.and = _isExist('every')
isExist.or = _isExist('some')
isExist.lazy = R.thunkify(isExist)

export default isExist
