import * as R from 'ramda'
import isEmpty from './isEmpty'

/**
 * Is invalid key for object?
 * @param  {String|Number} key
 * @return {Boolean}
 */
function isInvalidKey (key) {
  const isNotString = R.complement(R.is)(String)
  const isNotNumber = R.complement(R.is)(Number)
  const isInvalidKeyType = R.allPass([isNotString, isNotNumber])

  return R.anyPass([isInvalidKeyType, isEmpty])(key)
}

export default isInvalidKey
