import * as R from 'ramda'
import { createRegExp } from '~/utils'
import convertSnapshotToTiles from './convertSnapshotToTiles'

/**
 * Create regular expression of tile list
 * @param  {Array}  snapshot
 * @return {RegExp}
 */
function createSnapshotRe (snapshot) {
  return R.compose(
    createRegExp,
    R.join('|'),
    convertSnapshotToTiles
  )(snapshot)
}

export default createSnapshotRe
