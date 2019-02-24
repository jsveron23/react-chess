import { curry } from 'ramda'
import { isExist } from '~/utils'
import { replaceSnapshot } from '~/chess/helpers'
import _applyPromotion from './internal/_applyPromotion'

/**
 * Apply special actions after moving to tile
 * @param  {string} side
 * @param  {Array}  special
 * @param  {string} tile
 * @param  {Array}  timeline
 * @return {Object}
 */
function applySpecialActions (side, special, tile, timeline) {
  const [snapshot] = timeline

  if (special.length > 1) {
    const code = _applyPromotion(side, tile, special)
    const nextSnapshot = replaceSnapshot(code, tile, snapshot)

    if (isExist(nextSnapshot)) {
      return nextSnapshot
    }
  } else {
    // king
  }

  return snapshot
}

export default curry(applySpecialActions)
