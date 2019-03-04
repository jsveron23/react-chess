import { thunkify, identity } from 'ramda'

/**
 * Thunk
 * @param  {*}        v
 * @return {Function}
 */
function lazy (v) {
  return thunkify(identity)(v)
}

export default lazy
