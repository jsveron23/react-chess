import * as R from 'ramda'

/**
 * Is string?
 * @param  {*}       v
 * @return {Boolean}
 */
function isString (v) {
  return R.is(String)(v)
}

export default isString
