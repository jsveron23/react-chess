import * as R from 'ramda'
import { lazy, merge } from '~/utils'
import { getMovement, convertTileToAxis } from '../helpers'

/**
 * @param  {Function} getFlatArgs
 * @return {Function}
 */
function createMapCb (getFlatArgs) {
  const { x, y, turn } = getFlatArgs()

  /**
   * @callback
   * @param  {Array} mv
   * @return {Array}
   */
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
 * @param  {String} tile
 * @param  {String} turn
 * @param  {String} piece
 * @return {Array}
 */
function getMovableAxis (tile, turn, piece) {
  const mapCb = R.compose(
    createMapCb,
    lazy,
    merge({ turn }),
    convertTileToAxis
  )(tile)

  return R.compose(
    R.map(mapCb),
    getMovement
  )(piece)
}

export default R.curry(getMovableAxis)
