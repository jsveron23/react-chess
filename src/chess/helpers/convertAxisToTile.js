import * as R from 'ramda'
import { merge, pass } from '~/utils'
import getFile from './getFile'
import detectOutside from './detectOutside'

/**
 * Convert axis to tile
 * @param  {Array}  axis
 * @return {String}
 */
function convertAxisToTile (axis) {
  const [x, y] = axis
  const isOutside = detectOutside(x, y)

  return R.compose(
    pass(!isOutside),
    merge.txt
  )(getFile(x), y)
}

export default convertAxisToTile
