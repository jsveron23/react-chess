import { curry, reject } from 'ramda';
import { parseCode } from './parse-code';

/**
 * Remove code inside snapshot
 * @param  {Array}  snapshot
 * @param  {String} tileName
 * @return {Array}
 */
function removeCodeByTile(snapshot, tileName) {
  return reject(parseCode.eq(['tileName', tileName]), snapshot);
}

const removeCodeByTileCurried = curry(removeCodeByTile);
export { removeCodeByTileCurried as removeCodeByTile };