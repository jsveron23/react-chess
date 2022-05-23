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

  return snapshot.map(parseCode.prop('tileName'));
}

export default convertSnapshotToTiles;
