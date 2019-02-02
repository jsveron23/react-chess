import { curry, compose } from 'ramda'
import { parseTileName, getMovements, transformXY } from './helpers'

/**
 * Get axis([x, y]) from movements of piece
 * @param  {string} tileName
 * @param  {string} piece
 * @param  {string} turn
 * @return {Array}
 */
function getAxis (tileName, piece, turn) {
  const movements = getMovements(piece)
  const { x, y } = compose(
    transformXY,
    parseTileName
  )(tileName)

  return movements.map((mv) => {
    const [mvX, mvY] = mv
    const nextX = mvX + x
    const nextY = turn === 'white' ? mvY + y : y - mvY

    return [nextX, nextY]
  })
}

export default curry(getAxis)
