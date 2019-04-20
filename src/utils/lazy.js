import * as R from 'ramda'

/**
 * Delays a calculation until its result is needed
 * @param  {*}        v
 * @return {Function}
 */
function lazy (v) {
  return R.thunkify(R.identity)(v)
}

/**
 * With action
 * @param  {Function} fn
 * @param  {*}        v
 * @return {Function}
 */
function withAction (fn, v) {
  return R.thunkify(fn)(v)
}

lazy.withAction = R.curry(withAction)

export default lazy
