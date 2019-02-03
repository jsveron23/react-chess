import { curry, compose, map } from 'ramda'
import { parseTileName, getMovements, transformXY } from '~/chess/helpers'

/**
 * Get axis([x, y]) from movements of piece
 * @param  {string} tileName
 * @param  {string} piece
 * @param  {string} turn
 * @return {Array}
 */
function getAxis (tileName, piece, turn) {
  const { x, y } = compose(
    transformXY,
    parseTileName
  )(tileName)

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
