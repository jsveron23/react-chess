import convertCodeToTile from './convertCodeToTile'

/**
 * Convert code inside snapshot into tiles
 * @param  {Array} snapshot
 * @return {Array}
 */
function convertSnapshotToTiles (snapshot) {
  return snapshot.map(convertCodeToTile)
}

export default convertSnapshotToTiles
