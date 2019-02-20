import { compose, curry } from 'ramda'
import { findCode, convertAxisToTile } from '~/chess/helpers'

/**
 * Find code by axis
 * @param  {Array}  snapshot
 * @param  {Array}  axis
 * @return {string}
 */
function findCodeByAxis (snapshot, axis) {
  return compose(
    findCode(snapshot),
    convertAxisToTile
  )(axis)
}

export default curry(findCodeByAxis)
