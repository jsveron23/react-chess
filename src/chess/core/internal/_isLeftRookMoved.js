import * as R from 'ramda'
import { isEmpty } from '~/utils'
import findCode from '../../helpers/findCode'

/**
 * @param  {Array}   timeline
 * @param  {String}  side
 * @return {Boolean}
 */
function _isLeftRookMoved (timeline, side) {
  const leftRookCode = `${side}${side === 'w' ? 'Ra1' : 'Rh8'}`

  return timeline.some((snapshot) => {
    return R.compose(
      isEmpty,
      findCode(snapshot)
    )(leftRookCode)
  })
}

export default R.curry(_isLeftRookMoved)
