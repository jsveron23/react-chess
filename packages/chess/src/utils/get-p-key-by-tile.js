import { compose, defaultTo, curry } from 'ramda';
import { parseCode } from './parse-code';
import { findCodeByTile } from './find-code-by-tile';

/**
 * Get pKey by tile
 * @param  {Array}  snapshot
 * @param  {String} tile
 * @return {String}
 */
function getPKeyByTile(snapshot, tile) {
  return compose(
    parseCode.prop('pKey'),
    defaultTo(''),
    findCodeByTile(snapshot)
  )(tile);
}

const getPKeyByTileCurried = curry(getPKeyByTile);
export { getPKeyByTileCurried as getPKeyByTile };
