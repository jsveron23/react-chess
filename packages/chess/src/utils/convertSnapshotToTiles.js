import { map } from 'ramda';
import convertCodeToTile from './convertCodeToTile';
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

  return map(convertCodeToTile, snapshot);
}

export default convertSnapshotToTiles;
