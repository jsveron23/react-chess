/**
 * Transform snapshot to tiles
 * @param  {Array} snapshot
 * @return {Array}
 */
function transformSnapshotToTiles (snapshot) {
  return snapshot.map((item) => item.substr(2, 2))
}

export default transformSnapshotToTiles
