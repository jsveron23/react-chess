import { curry, compose, map } from 'ramda'
import convertTileToAxis from '../helpers/convertTileToAxis'
import getMovement from '../helpers/getMovement'

/**
 * Get movable axis from movements of piece (no invalid axis filter here)
 * @param  {string} tile
 * @param  {string} piece
 * @param  {string} turn
 * @return {Array}
 */
function getMovableAxis (tile, piece, turn) {
  const { x, y } = convertTileToAxis(tile)

  const mapCb = (mv) => {
    const [mvX, mvY] = mv
    const nextX = mvX + x

    // white: down -> up
    // black: up -> down
    const nextY = turn === 'white' ? mvY + y : y - mvY

    return [nextX, nextY]
  }

  return compose(
    map(mapCb),
    getMovement
  )(piece)
}

export default curry(getMovableAxis)
