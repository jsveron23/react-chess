import * as R from 'ramda'
import convertSnapshotToTiles from './convertSnapshotToTiles'

/**
 * Detect remain tiles on snapshot
 * @param  {Array}   snapshot
 * @param  {Array}   tiles
 * @return {Boolean}
 */
function detectRemain (snapshot, tiles) {
  return R.compose(
    R.any((tile) => tiles.includes(tile)),
    convertSnapshotToTiles
  )(snapshot)
}

export default R.curry(detectRemain)
