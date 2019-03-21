import * as R from 'ramda'
import { isEmpty } from '~/utils'
import findCode from './findCode'

/**
 * Detect is piece moved?
 * @param  {Array}   timeline
 * @param  {String}  searchTxt
 * @return {Boolean}
 */
function detectMoved (timeline, searchTxt) {
  return timeline.some((snapshot) => {
    return R.compose(
      isEmpty,
      findCode(snapshot)
    )(searchTxt)
  })
}

export default R.curry(detectMoved)
