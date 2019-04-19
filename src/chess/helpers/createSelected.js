import * as R from 'ramda'
import getSide from './getSide'

/**
 * Create selected
 * @param  {String} tile
 * @param  {String} turn
 * @return {String}
 */
function createSelected (tile, turn) {
  const side = getSide(turn)

  return `${tile}-${side}`
}

export default R.curry(createSelected)
