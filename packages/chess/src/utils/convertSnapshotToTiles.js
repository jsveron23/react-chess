import { map } from 'ramda';
import parseCode from './parseCode';
import validateSnapshot from './validateSnapshot';

/**
 * Convert snapshot to tiles
 * @param  {Array} snapshot [code<String>, ...]
 * @return {Array}
 */
function convertSnapshotToTiles(snapshot) {
  if (!validateSnapshot(snapshot)) {
    return [];
  }

  return map(parseCode.prop('tileName'), snapshot);
}

export default convertSnapshotToTiles;
