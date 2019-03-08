import * as R from 'ramda'

/**
 * Thunk
 * @param  {*}        v
 * @return {Function}
 */
function lazy (v) {
  return R.thunkify(R.identity)(v)
}

export default lazy
