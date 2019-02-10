import { isEmpty } from '~/utils'
import { getFile } from '~/chess/helpers'

/**
 * Transform axis to tile
 * @param  {Array} axis
 * @return {Array}
 */
function transformAxisToTile (axis) {
  const [fileNum, rankNum] = axis
  const nextFile = getFile(fileNum)
  const nextTile = `${nextFile}${rankNum}`
  const isOutside = isEmpty(nextFile) || rankNum <= 0 || rankNum > 8

  return !isOutside ? nextTile : []
}

export default transformAxisToTile
