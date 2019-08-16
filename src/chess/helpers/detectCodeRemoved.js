import * as R from 'ramda'
import { isEmpty } from '~/utils'
import findCode from './findCode'

/**
 * Detect whether code removed from snapshot
 * @param  {String}  code
 * @param  {Array}   snapshot
 * @return {Boolean}
 */
function detectCodeRemoved (code, snapshot) {
  return R.compose(
    isEmpty,
    findCode(snapshot)
  )(code)
}

export default R.curry(detectCodeRemoved)
