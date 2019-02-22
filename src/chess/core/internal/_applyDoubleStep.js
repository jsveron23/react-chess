import { compose, prop, curry, includes, and } from 'ramda'
import { isExist } from '~/utils'
import { convertTileToAxis, isPieceThere } from '~/chess/helpers'

const DOUBLE_STEP = 'doubleStep'
const DOUBLE_STEP_TILES = {
  w: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
  b: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7']
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
  const { x, y } = convertTileToAxis(tile)

  const isDoubleStep = compose(
    and(special.includes(DOUBLE_STEP)),
    includes(tile)
  )(DOUBLE_STEP_TILES[side])

  const isFirstTileBlocked = compose(
    isPieceThere(snapshot),
    prop(0)
  )(movableAxis)

  let nextMovableAxis = [...movableAxis]

  if (isDoubleStep && isExist(movableAxis)) {
    const nextY = side === 'w' ? y + 2 : y - 2
    const nextAxis = [x, nextY]
    const isNextTileBlocked = isPieceThere(snapshot, nextAxis)

    nextMovableAxis = [...movableAxis, nextAxis]

    if (isNextTileBlocked) {
      nextMovableAxis = [...movableAxis]
    }
  }

  if (isFirstTileBlocked) {
    nextMovableAxis = []
  }

  return nextMovableAxis
}

export default curry(_applyDoubleStep)
