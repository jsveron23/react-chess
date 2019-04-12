import * as R from 'ramda'

/**
 * Simple increase
 * @param  {Number} from
 * @param  {Number} to
 * @return {Array}
 */
function increase (from, to) {
  return R.range(from, to)
}

export default R.curry(increase)
