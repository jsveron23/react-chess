import { curry, reject } from 'ramda';
import parseCode from './parseCode';

/**
 * Remove code inside snapshot
 * @param  {Array}  snapshot
 * @param  {String} tileName
 * @return {Array}
 */
function removeCodeByTile(snapshot, tileName) {
  return reject(parseCode.eq(['tileName', tileName]), snapshot);
}

export default curry(removeCodeByTile);
