import * as R from 'ramda'
import { isEmpty } from '~/utils'
import createSnapshotRe from './createSnapshotRe'
import convertAxisToTile from './convertAxisToTile'

/**
 * Detect pice on tile tile
 * @param  {String}  snapshot
 * @param  {Array}   axis
 * @return {Boolean}
 */
function isPieceThere (snapshot, axis) {
  if (isEmpty.or(snapshot, axis)) {
    return false
  }

  const re = createSnapshotRe(snapshot)

  return R.compose(
    R.test(re),
    convertAxisToTile
  )(axis)
}

export default R.curry(isPieceThere)
