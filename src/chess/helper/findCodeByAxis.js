import * as R from 'ramda'
import findCode from './findCode'
import convertAxisToTile from './convertAxisToTile'

/**
 * Find a code that converted from axis
 * @param  {Array}  snapshot
 * @param  {Array}  axis
 * @return {String}
 */
function findCodeByAxis (snapshot, axis) {
  return R.compose(
    findCode(snapshot),
    convertAxisToTile
  )(axis)
}

export default R.curry(findCodeByAxis)
