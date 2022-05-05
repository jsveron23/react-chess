import { curry, compose, prop, reject, equals } from 'ramda';
import parseCode from './parseCode';

/**
 * Remove code inside snapshot
 * @param  {Array}  snapshot
 * @param  {String} tileName
 * @return {Array}
 */
function removeCodeByTile(snapshot, tileName) {
  return reject(
    compose(equals(tileName), prop('tileName'), parseCode),
    snapshot
  );
}

export default curry(removeCodeByTile);
