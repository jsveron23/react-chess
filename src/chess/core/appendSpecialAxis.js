import * as R from 'ramda'
import { isEmpty } from '~/utils'
import _applyDoubleStep from './internal/_applyDoubleStep'
import _applyEnPassant from './internal/_applyEnPassant'

/**
 * Append special axis before moving to tile
 * @param  {String} side
 * @param  {Array}  special
 * @param  {String} tile
 * @param  {Array}  timeline
 * @param  {Array}  movableAxis
 * @return {Array}
 */
function appendSpecialAxis (side, special, tile, timeline, movableAxis) {
  const [snapshot] = timeline
  let nextMovableAxis = [...movableAxis]

  if (special.length > 1) {
    const enPassantAxis = _applyEnPassant(side, tile, timeline)
    const doubleStepAxis = _applyDoubleStep(side, tile, special)(
      snapshot,
      movableAxis
    )

    nextMovableAxis = R.compose(
      R.reject(isEmpty),
      R.concat(enPassantAxis)
    )(doubleStepAxis)
  }

  return nextMovableAxis
}

export default R.curry(appendSpecialAxis)
