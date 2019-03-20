import * as R from 'ramda'
import convertSnapshotToTiles from './convertSnapshotToTiles'

/**
 * Detect block piece from timeline
 * TODO: merge with isBlockAt
 * @param  {Array}   timeline
 * @param  {Array}   tiles
 * @return {Boolean}
 */
function detectBlock (timeline, tiles) {
  const flippedSomeFn = R.compose(
    R.flip(R.any),
    convertSnapshotToTiles,
    R.prop(0)
  )(timeline)

  return R.compose(
    flippedSomeFn,
    R.flip(R.includes)
  )(tiles)
}

export default R.curry(detectBlock)
