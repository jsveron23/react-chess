import * as R from 'ramda'
import { lazy } from '~/utils'
import _log from './internal/_log'
import _isDevelopment from './internal/_isDevelopment'

/**
 * Display value on `console.log` while doing compose functions (debug only)
 * @see {@link https://medium.com/javascript-scene/composing-software-an-introduction-27b72500d6ea}
 * @param  {String} label
 * @return {*}
 */
function trace (label, v) {
  const isNotDevelopment = R.complement(_isDevelopment)

  return R.unless(
    R.compose(
      lazy,
      isNotDevelopment
    )(process.env.NODE_ENV),
    _log(label)
  )(v)
}

export default R.curry(trace)
