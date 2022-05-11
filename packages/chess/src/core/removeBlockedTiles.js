import { curry } from 'ramda';
import memoizeOne from 'memoize-one';
import { convertCodeListToTiles } from '../utils';

/**
 * Prevent multiple compute by multiple calls
 * @see `computeMTByDirection`
 */
const _convertCodeListToTiles = memoizeOne(convertCodeListToTiles);

/**
 * Remove blocked tiles (should be ordered by direction)
 * @param  {Array} snapshot
 * @param  {Array} orderedTiles ordered tiles by direction
 * @return {Array} removed tiles
 */
function removeBlockedTiles(snapshot, orderedTiles) {
  // change all code to tiles
  const placedTiles = _convertCodeListToTiles(snapshot);
  let lastIdx = -1;

  return orderedTiles.filter((tN) => {
    const idxNotDetectedYet = lastIdx === -1;
    const isBlocked = lastIdx > -1;

    if (idxNotDetectedYet) {
      lastIdx = placedTiles.indexOf(tN);
    }

    return !isBlocked;
  });
}

export default curry(removeBlockedTiles);
