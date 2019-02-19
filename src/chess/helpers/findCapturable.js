import { compose, curry } from 'ramda'
import { findCode, convertAxisToTile } from '~/chess/helpers'

/**
 * Find capturable tile
 * @param  {Array}  snapshot
 * @param  {Array}  axis
 * @return {string}
 */
function findCapturable (snapshot, axis) {
  return compose(
    findCode(snapshot),
    convertAxisToTile
  )(axis)
}

export default curry(findCapturable)
