import * as R from 'ramda'
import detectCodeRemoved from './detectCodeRemoved'
/**
 * Detect is piece moved?
 * @param  {Array}   timeline
 * @param  {String}  searchTxt
 * @return {Boolean}
 */
function detectMoved (timeline, searchTxt) {
  const awaitDetectCodeRemoved = detectCodeRemoved(searchTxt)

  return timeline.some(awaitDetectCodeRemoved)
}

export default R.curry(detectMoved)
