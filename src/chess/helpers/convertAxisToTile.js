import * as R from 'ramda'
import getFile from './getFile'
import createTile from './createTile'
import detectOutside from './detectOutside'

const flippedCreateTile = R.flip(createTile)

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

  return R.compose(
    flippedCreateTile(y),
    getFile
  )(x)
}

export default convertAxisToTile
