import { curry } from 'ramda'
import { isExist } from '~/utils'
import _applyPromotion from './internal/_applyPromotion'

/**
 * Apply special actions after moving to tile
 * @param  {string} side
 * @param  {Array}  special
 * @param  {string} tile
 * @param  {Array}  snapshot
 * @return {Object}
 */
function applySpecialActions (side, special, tile, snapshot) {
  if (special.length > 1) {
    const nextSnapshot = _applyPromotion(side, tile, special, snapshot)

    if (isExist(nextSnapshot)) {
      return nextSnapshot
    }
  } else {
    // king
  }

  return snapshot
}

export default curry(applySpecialActions)
