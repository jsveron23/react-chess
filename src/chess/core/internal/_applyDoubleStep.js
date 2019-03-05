import {
  curry,
  of,
  compose,
  ifElse,
  add,
  concat,
  assoc,
  identity,
  flip
} from 'ramda'
import { isExist, lazy } from '~/utils'
import _isDoubleStep from './_isDoubleStep'
import convertTileToAxis from '../../helpers/convertTileToAxis'
import isBlockedAt from '../../helpers/isBlockedAt'

/**
 * @param  {Function} getFlatArgs
 * @return {Array}
 */
function _getDoubleStepAxis (getFlatArgs) {
  const { x, y, side, movableAxis } = getFlatArgs()

  return compose(
    concat(movableAxis),
    of,
    concat([x]),
    of,
    ifElse(lazy(side === 'w'), add(2), add(-2))
  )(y)
}

/**
 * @param  {string} side
 * @param  {string} tile
 * @param  {Array}  special
 * @param  {Array}  snapshot
 * @param  {Array}  movableAxis
 * @return {Array}
 */
function _applyDoubleStep (side, tile, special, snapshot, movableAxis) {
  const detectBlocked = isBlockedAt(snapshot)
  const isFirstTileBlocked = detectBlocked(movableAxis, 0)
  const isDoubleStep = _isDoubleStep(tile, special, side)

  if (isFirstTileBlocked) {
    return []
  }

  if (isDoubleStep && isExist(movableAxis)) {
    return compose(
      ifElse(flip(detectBlocked)(1), lazy(movableAxis), identity),
      _getDoubleStepAxis,
      lazy,
      assoc('side', side),
      assoc('movableAxis', movableAxis),
      convertTileToAxis
    )(tile)
  }

  return movableAxis
}

export default curry(_applyDoubleStep)
