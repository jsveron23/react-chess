import { compose, curry, prop, equals, find } from 'ramda';
import parseCode from './parseCode';

/**
 * Find code by tile
 * @param  {Array}  snapshot
 * @param  {String} tileName
 * @return {String}
 */
function findCodeByTile(snapshot, tileName) {
  return find(compose(equals(tileName), prop('tileName'), parseCode), snapshot);
}

export default curry(findCodeByTile);
