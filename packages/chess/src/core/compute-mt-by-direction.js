import { compose, curry, reduce, keys, values, map, flatten } from 'ramda';
import { removeBlockedTiles } from './internal/remove-blocked-tiles';
import { groupDirectionTilesByCode } from './internal/group-direction-tiles-by-code';
import { validateCode, validateSnapshot } from '../utils';

/**
 * Compute generic movable tiles (it remove blocked tiles also)
 * @param  {Array}  snapshot
 * @param  {String} code
 * @return {Array}
 */
function computeMTByDirection(snapshot, code) {
  if (!validateCode(code) || !validateSnapshot(snapshot)) {
    throw new TypeError('invalid arguments');
  }

  const _removeBlockedTiles = removeBlockedTiles(snapshot);

  // generic direction group (tiles)
  const tilesGrp = groupDirectionTilesByCode(code);

  return compose(
    flatten,
    values,
    reduce((acc, key) => {
      return {
        ...acc,
        [key]: compose(map(_removeBlockedTiles), values)(tilesGrp[key]),
      };
    }, {}),
    keys
  )(tilesGrp);
}

const computeMTByDirectionCurried = curry(computeMTByDirection);
export { computeMTByDirectionCurried as computeMTByDirection };
