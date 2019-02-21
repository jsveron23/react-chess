import { curry } from 'ramda'
import { isExist } from '~/utils'
import { findCodeByAxis, convertTileToAxis } from '~/chess/helpers'

/**
 * @param  {string} side
 * @param  {string} tile
 * @param  {Array}  snapshot
 * @return {Array}
 */
function _applyEnPassant (side, tile, snapshot) {
  const { x, y } = convertTileToAxis(tile)
  const diagonalRightAxis = side === 'w' ? [x + 1, y + 1] : [x - 1, y - 1]
  const diagonalLeftAxis = side === 'w' ? [x - 1, y + 1] : [x + 1, y - 1]
  const findCapturableTile = findCodeByAxis(snapshot)
  const rightTile = findCapturableTile(diagonalRightAxis)
  const leftTile = findCapturableTile(diagonalLeftAxis)

  return [
    ...[isExist(rightTile) ? diagonalRightAxis : []],
    ...[isExist(leftTile) ? diagonalLeftAxis : []]
  ]
}

export default curry(_applyEnPassant)
