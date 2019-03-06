import * as R from 'ramda'
import findCode from './findCode'
import parseCode from './parseCode'

/**
 * Find code by tile
 * @param  {Array}  snapshot
 * @param  {String} tile
 * @return {String}
 */
function findCodeByTile (snapshot, tile) {
  return R.compose(
    parseCode,
    findCode(snapshot)
  )(tile)
}

export default R.curry(findCodeByTile)
