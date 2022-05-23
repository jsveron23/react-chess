import { curry } from 'ramda';
import parseCode from './parseCode';
import validateSnapshot from './validateSnapshot';

/**
 * Find code by tile
 * @param  {Array}  snapshot
 * @param  {String} tile
 * @return {String}
 */
function findCodeByTile(snapshot, tile) {
  if (!validateSnapshot(snapshot)) {
    return '';
  }

  return snapshot.find(parseCode.eq(['tileName', tile]));
}

export default curry(findCodeByTile);
