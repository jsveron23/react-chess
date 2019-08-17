import * as R from 'ramda'
import { isEmpty, merge, pass } from '~/utils'
import getFile from './getFile'
import detectOutside from './detectOutside'

// TODO will create single helper function
function detectNotAxis (axis) {
  const _detectIsNotArray = R.compose(
    R.complement,
    R.is
  )(Array)

  const _detectIsNotAxisSize = R.compose(
    R.any((maybeAxis) => maybeAxis.length !== 2),
    R.of // mappable
  )

  return R.anyPass(
    [
      isEmpty,
      _detectIsNotArray,
      _detectIsNotAxisSize
    ]
  )(axis)
}

/**
 * Convert axis to tile
 * @param  {Array}  axis
 * @return {String}
 */
function convertAxisToTile (axis) {
  const isNotAxis = detectNotAxis(axis)

  if (isNotAxis) {
    throw new Error('It seems not axis value!')
  }

  const [x, y] = axis
  const isOutside = detectOutside(x, y)

  return R.compose(
    pass(!isOutside),
    merge.txt
  )(getFile(x), y)
}

export default convertAxisToTile
