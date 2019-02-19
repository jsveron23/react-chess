import { isEmpty } from '~/utils'
import { getFile } from '~/chess/helpers'

/**
 * Convert axis to tile
 * @param  {Array} axis
 * @return {Array}
 */
function convertAxisToTile (axis) {
  const [x, y] = axis
  const nextFile = getFile(x)
  const nextTile = `${nextFile}${y}`
  const isOutside = isEmpty(nextFile) || y <= 0 || y > 8

  return !isOutside ? nextTile : ''
}

export default convertAxisToTile
