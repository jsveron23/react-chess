import { curry, compose, map } from 'ramda'
import { parseTile, getMovement, transformTileToAxis } from '~/chess/helpers'

/**
 * Get movable axis from movements of piece (no invalid axis filter here)
 * @param  {string} tile
 * @param  {string} piece
 * @param  {string} turn
 * @return {Array}
 */
function getMovableAxis (tile, piece, turn) {
  const { x, y } = compose(
    transformTileToAxis,
    parseTile
  )(tile)

  const _mapFn = (mv) => {
    const [mvX, mvY] = mv
    const nextX = mvX + x

    // white: down -> up
    // black: up -> down
    const nextY = turn === 'white' ? mvY + y : y - mvY

    return [nextX, nextY]
  }

  return compose(
    map(_mapFn),
    getMovement
  )(piece)
}

export default curry(getMovableAxis)
