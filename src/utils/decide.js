import * as R from 'ramda'

/**
 * Decide which function will use by condition then using argument to function
 * @param  {Array}    fns
 * @param  {Array}    args
 * @param  {Function} cb
 * @return {Array}
 */
function decide (fns, args, cb) {
  const isInvalid = fns.length !== args.length && (fns.length !== 2 || args.length !== 2)

  if (isInvalid) {
    throw new Error('It is not same length!')
  }

  if (typeof cb !== 'function') {
    cb = R.identity
  }

  const [a, b] = args
  const bool = cb(a, b)
  const fn = bool ? fns[0] : fns[1]

  return fn(a, b)
}

export default R.curry(decide)
