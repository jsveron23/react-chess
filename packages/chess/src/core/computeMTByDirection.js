import {
  compose,
  curry,
  reduce,
  prop,
  keys,
  values,
  map,
  assoc,
  flatten,
} from 'ramda';
import removeBlockedTiles from './internal/removeBlockedTiles';
import groupDirectionTilesByCode from './internal/groupDirectionTilesByCode';
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

  const directionTilesGrp = groupDirectionTilesByCode(code);
  const _removeBlockedTiles = (key) =>
    compose(
      map(removeBlockedTiles(snapshot)),
      values,
      prop(key)
    )(directionTilesGrp);

  return compose(
    flatten,
    values,
    reduce((acc, key) => assoc(key, _removeBlockedTiles(key), acc), {}),
    keys
  )(directionTilesGrp);
}

export default curry(computeMTByDirection);
