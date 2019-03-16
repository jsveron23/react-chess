import * as R from 'ramda'
import { isExist, lazy, merge } from '~/utils'
import _isDoubleStep from './_isDoubleStep'
import _getDoubleStepAxis from './_getDoubleStepAxis'
import convertTileToAxis from '../../helpers/convertTileToAxis'
import isBlockedAt from '../../helpers/isBlockedAt'

/**
 * TODO: check block
 * @param  {String} side
 * @param  {String} tile
 * @param  {Array}  timeline
 * @param  {Array}  movableAxis
 * @return {Array}
 */
function _applyDoubleStep (side, tile, timeline, movableAxis) {
  const [snapshot] = timeline
  const isDoubleStep = _isDoubleStep(tile, side)
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

      merge({
        side,
        movableAxis
      }),
      convertTileToAxis
    )(tile)
  }

  return movableAxis
}

export default R.curry(_applyDoubleStep)
