import { curry, of, compose, ifElse, add, concat } from 'ramda'
import { convertTileToAxis, isBlockedAt } from '~/chess/helpers'
import { isExist, lazy } from '~/utils'
import _isDoubleStep from './_isDoubleStep'

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
  const isFirstTileBlocked = isBlockedAt(snapshot, movableAxis)(0)
  const isDoubleStep = _isDoubleStep(tile, special, side)
  let cloneMovableAxis = [...movableAxis]

  if (isFirstTileBlocked) {
    return []
  }

  if (isDoubleStep && isExist(movableAxis)) {
    cloneMovableAxis = _getDoubleStepAxis(() => {
      const { x, y } = convertTileToAxis(tile)

      return { x, y, side, movableAxis: cloneMovableAxis }
    })

    const isNextTileBlocked = isBlockedAt(snapshot, cloneMovableAxis)(1)

    if (isNextTileBlocked) {
      return [...movableAxis]
    }

    return cloneMovableAxis
  }

  return cloneMovableAxis
}

export default curry(_applyDoubleStep)
