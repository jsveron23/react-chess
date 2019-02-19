import { curry, compose, prop } from 'ramda'
import { findCode, parseCode } from '~/chess/helpers'

/**
 * Get side of tile of snapshot
 * @param  {string} tile
 * @param  {Array}  snapshot
 * @return {string}
 */
function findSideByTile (tile, snapshot) {
  return compose(
    prop('side'),
    parseCode,
    findCode(snapshot)
  )(tile)
}

export default curry(findSideByTile)
