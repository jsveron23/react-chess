import * as R from 'ramda'
import isEmpty from './isEmpty'

/**
 * Decide which function will use
 * @param  {Array}    fns
 * @param  {Array}    args
 * @param  {Function} cb
 * @return {Array}
 */
function decide (fns, args, cb) {
  const fnLen = fns.length
  const argsLen = args.length
  const isInvalid = fnLen !== argsLen && (fnLen !== 2 || argsLen !== 2)

  if (isInvalid) {
    throw new Error('It is not same length!')
  }

  if (typeof cb !== 'function') {
    cb = R.identity
  }

  const [a, b] = args
  const bool = cb(a, b)

  if (isEmpty(bool)) {
    throw new Error('Callback is not working propery!')
  }

  const fn = bool ? fns[0] : fns[1]

  return fn(a, b)
}

export default R.curry(decide)
