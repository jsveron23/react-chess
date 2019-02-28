import { compose, curry, test } from 'ramda'
import { isEmpty } from '~/utils'
import { createSnapshotRe, convertAxisToTile } from '~/chess/helpers'

/**
 * Detect pice on tile tile
 * @param  {string}  snapshot
 * @param  {Array}   axis
 * @return {Boolean}
 */
function isPieceThere (snapshot, axis) {
  if (isEmpty.or(snapshot, axis)) {
    return false
  }

  const re = createSnapshotRe(snapshot)

  return compose(
    test(re),
    convertAxisToTile
  )(axis)
}

export default curry(isPieceThere)
