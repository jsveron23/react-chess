import { curry, compose, reject } from 'ramda'
import { isEmpty, isExist } from '~/utils'
import { replaceSnapshot } from '~/chess/helpers'
import _applyPromotion from './internal/_applyPromotion'
import { _applySnapshot } from './internal/_applyEnPassant'

/**
 * Apply special actions after moving to tile
 * @TODO: optimize
 * @param  {string} side
 * @param  {Array}  special
 * @param  {string} tile
 * @param  {Array}  timeline
 * @return {Array}
 */
function applySpecialActions (side, special, tile, timeline) {
  const [snapshot, prevSnapshot] = timeline

  if (special.length > 1) {
    let nextSnapshot

    if (isExist(prevSnapshot)) {
      const enPassantTile = _applySnapshot(side, tile, timeline)

      if (isExist(enPassantTile)) {
        nextSnapshot = compose(
          reject(isEmpty),
          replaceSnapshot('', enPassantTile)
        )(snapshot)
      }
    }

    const promotionCode = _applyPromotion(side, tile, special)

    if (isExist(promotionCode)) {
      nextSnapshot = [...snapshot]

      nextSnapshot = replaceSnapshot(promotionCode, tile, nextSnapshot)
    }

    if (isExist(nextSnapshot)) {
      return nextSnapshot
    }
  } else {
    // king
  }

  return snapshot
}

export default curry(applySpecialActions)
