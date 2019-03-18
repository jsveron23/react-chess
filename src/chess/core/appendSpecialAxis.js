import * as R from 'ramda'
import { isEmpty } from '~/utils'
import _applyDoubleStep from './internal/_applyDoubleStep'
import _applyEnPassant from './internal/_applyEnPassant'
import _applyCastling from './internal/_applyCastling'

/**
 * Append special axis before moving to tile
 * TODO: return only their axis
 * @param  {String} side
 * @param  {Array}  special
 * @param  {String} tile
 * @param  {String} checkBy
 * @param  {Array}  timeline
 * @param  {Array}  movableAxis
 * @return {Array}
 */
function appendSpecialAxis (
  side,
  special,
  tile,
  checkBy,
  timeline,
  movableAxis
) {
  if (special.includes('doubleStep')) {
    const enPassantAxis = _applyEnPassant(side, tile, timeline)
    const doubleStepAxis = _applyDoubleStep(side, tile, timeline, movableAxis)

    return R.compose(
      R.reject(isEmpty),
      R.concat(enPassantAxis)
    )(doubleStepAxis)
  }

  if (special.includes('castling')) {
    const castlingAxis = _applyCastling(side, checkBy, timeline)

    return [...movableAxis, ...castlingAxis]
  }

  return [...movableAxis]
}

export default R.curry(appendSpecialAxis)
