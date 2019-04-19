import * as R from 'ramda'
import parseCode from './parseCode'

/**
 * Convert code inside snapshot into tiles
 * @param  {Array} snapshot
 * @return {Array}
 */
function convertSnapshotToTiles (snapshot) {
  return snapshot.map(
    R.compose(
      R.prop('tile'),
      parseCode
    )
  )
}

export default convertSnapshotToTiles
