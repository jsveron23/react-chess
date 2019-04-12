import * as R from 'ramda'

/**
 * Simple decrease
 * @param  {Number} from
 * @param  {Number} to
 * @return {Array}
 */
function decrease (from, to) {
  return R.compose(
    R.reverse,
    R.range(to + 1)
  )(from + 1)
}

export default R.curry(decrease)
