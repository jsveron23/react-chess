import { map } from 'ramda';
import convertCodeToTile from './convertCodeToTile';
import validateSnapshot from './validateSnapshot';

/**
 * Convert code list to tiles
 * @param  {Array} snapshot
 * @return {Array}
 */
export default function convertCodeListToTiles(snapshot) {
  if (!validateSnapshot(snapshot)) {
    return [];
  }

  return map(convertCodeToTile, snapshot);
}
