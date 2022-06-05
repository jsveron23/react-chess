import { curry } from 'ramda';
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

  const strSnapshot = snapshot.join(',');
  const idx = strSnapshot.indexOf(tile);

  return idx > -1 ? strSnapshot.slice(idx - 2, idx + 2) : undefined;
}

export default curry(findCodeByTile);
