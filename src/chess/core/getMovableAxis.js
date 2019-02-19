import { curry, compose, map } from 'ramda'
import { getMovement, convertTileToAxis } from '~/chess/helpers'

function createMapCb (tile, turn) {
  const { x, y } = convertTileToAxis(tile)

  return (mv) => {
    const [mvX, mvY] = mv
    const nextX = mvX + x

    // white: down -> up
    // black: up -> down
    const nextY = turn === 'white' ? mvY + y : y - mvY

    return [nextX, nextY]
  }
}

/**
 * Get movable axis from movements of piece (no invalid axis filter here)
 * @param  {string} tile
 * @param  {string} piece
 * @param  {string} turn
 * @return {Array}
 */
function getMovableAxis (tile, piece, turn) {
  const mapCb = createMapCb(tile, turn)

  return compose(
    map(mapCb),
    getMovement
  )(piece)
}

export default curry(getMovableAxis)
