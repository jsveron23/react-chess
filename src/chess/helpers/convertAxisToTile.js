import { isEmpty } from '~/utils'
import getFile from './getFile'

/**
 * # Diagram (tiles)
 *
 * a8 b8 c8 d8 e8 f8 g8 h8
 * a7 b7 c7 d7 e7 f7 g7 h7
 * a6 b6 c6 d6 e6 f6 g6 h6
 * a5 b5 c5 d5 d5 f5 g5 h5
 * a4 b4 c4 d4 d4 f4 g4 h4
 * a3 b3 c3 d3 d3 f3 g3 h3
 * a2 b2 c2 d2 d2 f2 g2 h2
 * a1 b1 c1 d1 d1 f1 g1 h1
 *
 * a ~ h = 1 ~ 8
 */

/**
 * Convert axis to tile
 * @param  {Array} axis
 * @return {Array}
 */
function convertAxisToTile (axis) {
  const [x, y] = axis
  const nextFile = getFile(x)
  const nextTile = `${nextFile}${y}`
  const isOutside = isEmpty(nextFile) || y <= 0 || y > 8

  return !isOutside ? nextTile : ''
}

export default convertAxisToTile
