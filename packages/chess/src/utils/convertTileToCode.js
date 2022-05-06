import { curry, find, equals, compose, prop } from 'ramda';
import parseCode from './parseCode';

/**
 * Convert tile to code
 * @param  {Array}  snapshot
 * @param  {String} tileName
 * @return {String}
 */
function convertTileToCode(snapshot, tileName) {
  return find(compose(equals(tileName), prop('tileName'), parseCode), snapshot);
}

export default curry(convertTileToCode);
