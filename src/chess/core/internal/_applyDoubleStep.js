import * as R from 'ramda'
import { isExist, lazy } from '~/utils'
import _isDoubleStep from './_isDoubleStep'
import _getDoubleStepAxis from './_getDoubleStepAxis'
import convertTileToAxis from '../../helpers/convertTileToAxis'
import isBlockedAt from '../../helpers/isBlockedAt'

/**
 * TODO: check block
 * @param  {string} side
 * @param  {string} tile
 * @param  {Array}  special
 * @param  {Array}  snapshot
 * @param  {Array}  movableAxis
 * @return {Array}
 */
function _applyDoubleStep (side, tile, special, snapshot, movableAxis) {
  const isDoubleStep = _isDoubleStep(tile, special, side)
  const detectBlocked = isBlockedAt(snapshot)
  const isFirstTileBlocked = detectBlocked(movableAxis, 0)

  if (isFirstTileBlocked) {
    return []
  }

  if (isDoubleStep && isExist(movableAxis)) {
    const flippedDetectBlock = R.flip(detectBlocked)

    return R.compose(
      // condition with result from `_getDoubleStepAxis`
      // if block, return original but no block return calculated one
      R.ifElse(flippedDetectBlock(1), lazy(movableAxis), R.identity),

      // passing function to `_getDoubleStepAxis`
      // execute function inside `_getDoubleStepAxis` by using `lazy`
      _getDoubleStepAxis,
      lazy,

      // simple merge
      R.assoc('side', side),
      R.assoc('movableAxis', movableAxis),
      convertTileToAxis
    )(tile)
  }

  return movableAxis
}

export default R.curry(_applyDoubleStep)
