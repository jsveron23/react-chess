import * as R from 'ramda'
import detectCodeRemoved from './detectCodeRemoved'
/**
 * Detect is piece moved?
 * @param  {Array}   timeline
 * @param  {String}  searchTxt
 * @return {Boolean}
 */
function detectMoved (timeline, searchTxt) {
  return R.compose(
    R.flip(R.any)(timeline),
    detectCodeRemoved
  )(searchTxt)
}

export default R.curry(detectMoved)
