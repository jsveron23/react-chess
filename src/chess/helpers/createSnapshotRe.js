import * as R from 'ramda'
import { strToRegExp } from '~/utils'
import convertSnapshotToTiles from './convertSnapshotToTiles'

/**
 * Create regular expression of tile list
 * @param  {Array}  snapshot
 * @return {RegExp}
 */
function createSnapshotRe (snapshot) {
  return R.compose(
    strToRegExp,
    R.join('|'),
    convertSnapshotToTiles
  )(snapshot)
}

export default createSnapshotRe
