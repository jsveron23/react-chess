import { curry, compose, prop } from 'ramda'
import { getSide, findCode, parseCode } from '~/chess/helpers'

/**
 * Find side by tile
 * @param  {Array}  snapshot
 * @param  {string} tile
 * @return {string}
 */
function findSideByTile (snapshot, tile) {
  return compose(
    getSide,
    prop('side'),
    parseCode,
    findCode(snapshot)
  )(tile)
}

export default curry(findSideByTile)
