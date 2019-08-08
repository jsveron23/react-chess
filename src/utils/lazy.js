import * as R from 'ramda'

/**
 * Delays a calculation until its result is needed
 * @param  {*}        v
 * @return {Function}
 */
function lazy (v) {
  return R.thunkify(R.identity)(v)
}

export default lazy
