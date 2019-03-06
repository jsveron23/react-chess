import * as R from 'ramda'
import getSide from './getSide'

/**
 * Create selected
 * @param  {String} tile
 * @param  {String} turn
 * @return {String}
 */
function createSelected (tile, turn) {
  // ${tile}-${side}
  return R.compose(
    R.join('-'),
    R.prepend(tile),
    R.of,
    getSide
  )(turn)
}

export default R.curry(createSelected)
