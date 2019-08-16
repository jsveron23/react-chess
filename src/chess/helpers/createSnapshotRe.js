import * as R from 'ramda'
import convertSnapshotToTiles from './convertSnapshotToTiles'

/**
 * Create regular expression of tiles from snapshot
 * @param  {Array}  snapshot
 * @return {RegExp}
 */
function createSnapshotRe (snapshot) {
  const tiles = R.compose(
    R.join('|'),
    convertSnapshotToTiles
  )(snapshot)

  return new RegExp(tiles)
}

export default createSnapshotRe
