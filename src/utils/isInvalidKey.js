import * as R from 'ramda'
import isEmpty from './isEmpty'
import isString from './isString'
import isNumber from './isNumber'

/**
 * Is invalid key for object?
 * @param  {*}       key
 * @return {Boolean}
 */
function isInvalidKey (key) {
  const isNotString = R.complement(isString)
  const isNotNumber = R.complement(isNumber)
  const isInvalidKeyType = R.allPass([isNotString, isNotNumber])

  return R.anyPass([isInvalidKeyType, isEmpty])(key)
}

export default isInvalidKey
