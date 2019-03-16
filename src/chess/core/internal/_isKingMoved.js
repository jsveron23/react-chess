import * as R from 'ramda'
import findCode from '../../helpers/findCode'

/**
 * @param  {Array}   timeline
 * @param  {String}  side
 * @return {Boolean}
 */
function _isKingMoved (timeline, side) {
  const flippedFindCodeBySnapshot = R.flip(findCode)(`${side}K`)

  const firstKingCode = R.compose(
    flippedFindCodeBySnapshot,
    R.prop(0)
  )(timeline)

  return timeline.some((snapshot) => {
    return R.compose(
      R.not,
      R.equals(firstKingCode),
      flippedFindCodeBySnapshot
    )(snapshot)
  })
}

export default R.curry(_isKingMoved)
