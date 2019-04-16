import * as R from 'ramda'
import parseCode from './parseCode'

/**
 * Convert code inside snapshot into tiles
 * @param  {Array} snapshot
 * @return {Array}
 */
function convertSnapshotToTiles (snapshot) {
  const mapCb = R.compose(
    R.prop('tile'),
    parseCode
  )

  return snapshot.map(mapCb)
}

export default convertSnapshotToTiles
