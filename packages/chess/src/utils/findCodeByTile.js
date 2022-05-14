import { compose, curry, prop, equals, find } from 'ramda';
import parseCode from './parseCode';
import validateSnapshot from './validateSnapshot';

/**
 * Find code by tile
 * @param  {Array}  snapshot
 * @param  {String} tileName
 * @return {String}
 */
function findCodeByTile(snapshot, tileName) {
  if (!validateSnapshot(snapshot)) {
    return '';
  }

  return find(compose(equals(tileName), prop('tileName'), parseCode), snapshot);
}

export default curry(findCodeByTile);
