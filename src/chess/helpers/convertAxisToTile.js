import * as R from 'ramda'
import { pass } from '~/utils'
import getFile from './getFile'
import createTile from './createTile'
import detectOutside from './detectOutside'

/**
 * Convert axis to tile
 * @param  {Array}  axis
 * @return {String}
 */
function convertAxisToTile (axis) {
  const [x, y] = axis
  const isOutside = detectOutside(x, y)
  const getTile = R.flip(createTile)(y)

  return R.compose(
    pass(!isOutside),
    getTile,
    getFile
  )(x)
}

export default convertAxisToTile
