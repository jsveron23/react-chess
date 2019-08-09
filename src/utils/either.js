import * as R from 'ramda'

const isNotBoolean = R.complement(R.is)(Boolean)

/**
 * Decide which function will use (only 2 options is allowed to use)
 * @param  {Array}    fns
 * @param  {Array}    args
 * @param  {Function} cb
 * @return {Array}
 */
function either (fns, args, cb) {
  if (fns.length !== 2 || args.length !== 2) {
    throw new Error('It is not same length!')
  }

  if (typeof cb !== 'function') {
    throw new Error('Callback is not function!')
  }

  const [a, b] = args
  const bool = cb(a, b)

  if (isNotBoolean(bool)) {
    throw new Error('Callback did not return boolean!')
  }

  const fn = bool ? fns[0] : fns[1]

  return fn(a, b)
}

export default R.curry(either)
