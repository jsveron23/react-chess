import { curry, filter, indexOf } from 'ramda';
import memoizeOne from 'memoize-one';
import { convertCodeListToTiles } from '../utils';

// prevent compute several times
const _convertCodeListToTiles = memoizeOne(convertCodeListToTiles);

/**
 * Remove blocked tiles
 * @param  {Array} snapshot
 * @param  {Array} tiles
 * @return {Array}
 */
function removeBlockedTiles(snapshot, tiles) {
  // change all code to tiles
  const placedTiles = _convertCodeListToTiles(snapshot);
  let lastIdx = -1;

  return filter((tile) => {
    const idxNotDetectedYet = lastIdx === -1;
    // TODO possible bug
    const isBlocked = lastIdx > -1;

    if (idxNotDetectedYet) {
      lastIdx = indexOf(tile, placedTiles);
    }

    return !isBlocked;
  }, tiles);
}

export default curry(removeBlockedTiles);
