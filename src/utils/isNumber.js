import * as R from 'ramda'

/**
 * Is number?
 * @param  {*}       v
 * @return {Boolean}
 */
function isNumber (v) {
  return R.is(Number)(v)
}

export default isNumber
