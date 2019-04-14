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
  const isOutside = detectOutside(...axis)
  const [x, y] = axis
  const file = getFile(x)

  return R.compose(
    pass(!isOutside),
    createTile(file)
  )(y)
}

export default convertAxisToTile
