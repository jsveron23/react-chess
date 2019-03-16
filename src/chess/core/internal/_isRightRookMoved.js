import * as R from 'ramda'
import { isEmpty } from '~/utils'
import findCode from '../../helpers/findCode'

/**
 * @param  {Array}   timeline
 * @param  {String}  side
 * @return {Boolean}
 */
function _isRightRookMoved (timeline, side) {
  const leftRookCode = `${side}${side === 'w' ? 'Rh1' : 'Ra8'}`

  return timeline.some((snapshot) => {
    return R.compose(
      isEmpty,
      findCode(snapshot)
    )(leftRookCode)
  })
}

export default R.curry(_isRightRookMoved)
