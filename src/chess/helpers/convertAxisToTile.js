import { merge } from '~/utils'
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

  if (isOutside) {
    return ''
  }

  const file = getFile(x)

  return merge.txt(file, y)
}

export default convertAxisToTile
