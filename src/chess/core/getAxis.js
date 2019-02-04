import { curry, compose, map } from 'ramda'
import { parseTileName, getMovements, transformXY } from '~/chess/helpers'

/**
 * Get axis([x, y]) from movements of piece
 * @param  {string} tile
 * @param  {string} piece
 * @param  {string} turn
 * @return {Array}
 */
function getAxis (tile, piece, turn) {
  const { x, y } = compose(
    transformXY,
    parseTileName
  )(tile)

  const _mapFn = (mv) => {
    const [mvX, mvY] = mv
    const nextX = mvX + x
    const nextY = turn === 'white' ? mvY + y : y - mvY

    return [nextX, nextY]
  }

  return compose(
    map(_mapFn),
    getMovements
  )(piece)
}

export default curry(getAxis)
