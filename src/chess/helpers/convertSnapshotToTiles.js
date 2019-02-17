/**
 * Convert snapshot to tiles
 * @param  {Array} snapshot
 * @return {Array}
 */
function convertSnapshotToTiles (snapshot) {
  return snapshot.map((item) => item.substr(2, 2))
}

export default convertSnapshotToTiles
