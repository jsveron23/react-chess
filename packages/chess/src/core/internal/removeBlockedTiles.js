import { curry, flip, indexOf, compose, filter } from 'ramda';
import memoizeOne from 'memoize-one';
import equal from 'fast-deep-equal';
import { convertSnapshotToTiles } from '../../utils';

const _indexOf = flip(indexOf);

/**
 * Prevent multiple compute by multiple calls
 * @see `computeMTByDirection`
 */
const _convertSnapshotToTiles = memoizeOne(convertSnapshotToTiles, equal);

/**
 * Remove blocked tiles (should be ordered by direction)
 * @param  {Array} snapshot
 * @param  {Array} orderedTiles ordered tiles by direction
 * @return {Array} removed tiles
 */
function removeBlockedTiles(snapshot, orderedTiles) {
  const _indexOfTn = compose(_indexOf, _convertSnapshotToTiles)(snapshot);
  let lastIdx = -1;

  return filter((tN) => {
    const idxNotDetectedYet = lastIdx === -1;
    const isBlocked = lastIdx > -1;

    if (idxNotDetectedYet) {
      lastIdx = _indexOfTn(tN);
    }

    return !isBlocked;
  }, orderedTiles);
}

export default curry(removeBlockedTiles);
