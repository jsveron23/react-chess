import * as R from 'ramda'
import detectCodeRemoved from './detectCodeRemoved'

/**
 * Detect is piece moved?
 * @param  {Array}   timeline
 * @param  {String}  searchTxt
 * @return {Boolean}
 */
function detectMoved (timeline, searchTxt) {
  const detectMovedFn = R.compose(
    R.any,
    detectCodeRemoved
  )(searchTxt)

  return detectMovedFn(timeline)
}

export default R.curry(detectMoved)
