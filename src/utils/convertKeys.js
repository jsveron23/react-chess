import { curry, keys, compose, reduce } from 'ramda'
import { _createReduceCb } from './internal/_convertKeys'

/**
 * Convert object keys (compose)
 * @param  {Object} names
 * @param  {Object} v
 * @return {Object}
 */
function convertKeys (names, v) {
  const reduceCb = _createReduceCb(names, v)

  return compose(
    reduce(reduceCb, {}),
    keys
  )(v)
}

export default curry(convertKeys)
