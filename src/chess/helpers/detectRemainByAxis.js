import * as R from 'ramda'
import { isEmpty } from '~/utils'
import createSnapshotRe from './createSnapshotRe'
import convertAxisToTile from './convertAxisToTile'

/**
 * Detect remain tile by axis
 * @param  {String}  snapshot
 * @param  {Array}   axis
 * @return {Boolean}
 */
function detectRemainByAxis (snapshot, axis) {
  if (isEmpty.or(snapshot, axis)) {
    return false
  }

  const re = createSnapshotRe(snapshot)

  return R.compose(
    R.test(re),
    convertAxisToTile
  )(axis)
}

export default R.curry(detectRemainByAxis)
