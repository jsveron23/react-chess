import * as R from 'ramda'
import convertSnapshotToTiles from './convertSnapshotToTiles'

/**
 * Detect remain tiles on snapshot
 * @param  {Array}   snapshot
 * @param  {Array}   tiles
 * @return {Boolean}
 */
function detectRemain (snapshot, tiles) {
  const flippedSomeFn = R.compose(
    R.flip(R.any),
    convertSnapshotToTiles
  )(snapshot)

  return R.compose(
    flippedSomeFn,
    R.flip(R.includes)
  )(tiles)
}

export default R.curry(detectRemain)
