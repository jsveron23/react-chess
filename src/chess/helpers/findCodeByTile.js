import { curry, compose } from 'ramda'
import { findCode, parseCode } from '~/chess/helpers'

/**
 * Find code by tile
 * @param  {Array}  snapshot
 * @param  {string} tile
 * @return {string}
 */
function findCodeByTile (snapshot, tile) {
  return compose(
    parseCode,
    findCode(snapshot)
  )(tile)
}

export default curry(findCodeByTile)
