import { compose, curry, reduce, keys, values, map, flatten } from 'ramda';
import removeBlockedTiles from './removeBlockedTiles';
import {
  validateCode,
  validateSnapshot,
  groupDirectionTilesBy,
} from '../utils';

/**
 * Compute generic movable tiles (it remove blocked tiles also)
 * @param  {String} code
 * @param  {Array}  snapshot
 * @return {Array}
 */
function computeMTByDirection(code, snapshot) {
  if (!validateCode(code) || !validateSnapshot(snapshot)) {
    throw new TypeError(
      `invalid argument | code: ${code} / snapshot: ${snapshot}`
    );
  }

  // generic direction group (tiles)
  const tilesGrp = groupDirectionTilesBy(code);

  return compose(
    flatten,
    values,
    reduce((acc, key) => {
      return {
        ...acc,
        [key]: compose(
          map(removeBlockedTiles(snapshot)),
          values
        )(tilesGrp[key]),
      };
    }, {}),
    keys
  )(tilesGrp);
}

export default curry(computeMTByDirection);
