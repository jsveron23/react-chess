import { compose, curry, prop, equals, find } from 'ramda';
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

  return find(compose(equals(tile), prop('tileName'), parseCode), snapshot);
}

export default curry(findCodeByTile);
