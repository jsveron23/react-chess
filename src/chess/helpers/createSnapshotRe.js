import * as R from 'ramda'
import convertSnapshotToTiles from './convertSnapshotToTiles'

/**
 * Create regular expression of tile list
 * @param  {Array}  snapshot
 * @return {RegExp}
 */
function createSnapshotRe (snapshot) {
  return R.compose(
    (txt) => new RegExp(txt),
    R.join('|'),
    convertSnapshotToTiles
  )(snapshot)
}

export default createSnapshotRe
