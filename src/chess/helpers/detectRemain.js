import * as R from 'ramda'
import convertSnapshotToTiles from './convertSnapshotToTiles'

/**
 * Detect remain tiles on snapshot
 * @param  {Array}   snapshot
 * @param  {Array}   tiles
 * @return {Boolean}
 */
function detectRemain (snapshot, tiles) {
  const tilesFromSnapshot = convertSnapshotToTiles(snapshot)
  const includesTiles = R.flip(R.includes)(tiles)

  return tilesFromSnapshot.some(includesTiles)
}

export default R.curry(detectRemain)
