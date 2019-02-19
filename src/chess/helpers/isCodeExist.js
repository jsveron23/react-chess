import { compose, curry } from 'ramda'
import { isEmpty, isExist } from '~/utils'
import { findCode, convertAxisToTile } from '~/chess/helpers'

/**
 * Detect pice on tile tile
 * @param  {string}  snapshot
 * @param  {Array}   axis
 * @return {Boolean}
 */
function isPieceOnTile (snapshot, axis) {
  if (isEmpty.or(snapshot, axis)) {
    return false
  }

  return compose(
    isExist,
    findCode(snapshot),
    convertAxisToTile
  )(axis)
}

export default curry(isPieceOnTile)
