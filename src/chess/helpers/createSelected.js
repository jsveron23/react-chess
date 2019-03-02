import { compose, join, of, prepend, curry } from 'ramda'
import { getSide } from '~/chess/helpers'

/**
 * Create selected
 * @param  {string} tile
 * @param  {string} turn
 * @return {string}
 */
function createSelected (tile, turn) {
  // ${tile}-${side}
  return compose(
    join('-'),
    prepend(tile),
    of,
    getSide
  )(turn)
}

export default curry(createSelected)
