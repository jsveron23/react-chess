import * as R from 'ramda'
import { isEmpty, isExist } from '~/utils'
import _applyPromotion from './internal/_applyPromotion'
import { _applySnapshot } from './internal/_applyEnPassant'
import { replaceSnapshot } from '../helpers'

/**
 * Apply special actions after moving to tile
 * @TODO: optimize
 * @param  {String} side
 * @param  {Array}  special
 * @param  {String} tile
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
        nextSnapshot = R.compose(
          R.reject(isEmpty),
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

export default R.curry(applySpecialActions)
