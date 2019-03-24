import * as R from 'ramda'
import convertSnapshotToTiles from './convertSnapshotToTiles'

/**
 * Detect remain tiles on snapshot
 * @param  {Array}   snapshot
 * @param  {Array}   tiles
 * @return {Boolean}
 */
function detectRemain (snapshot, tiles) {
  const detectIncluded = R.flip(R.includes)(tiles)

  return R.compose(
    R.any(detectIncluded),
    convertSnapshotToTiles
  )(snapshot)
}

export default R.curry(detectRemain)
