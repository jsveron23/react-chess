/**
 * Convert snapshot to tiles
 * @param  {Array} snapshot
 * @return {Array}
 */
function convertSnapshotToTiles (snapshot) {
  return snapshot.map((code) => code.substr(2, 2))
}

export default convertSnapshotToTiles
