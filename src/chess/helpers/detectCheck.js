import * as R from 'ramda'
import { isExist } from '~/utils'
import parseCode from './parseCode'

/**
 * Detect is check?
 * @param  {String}  checkBy
 * @param  {String}  side
 * @return {Boolean}
 */
function detectCheck (checkBy, side) {
  return R.ifElse(
    isExist,
    R.compose(
      R.not,
      R.equals(side),
      R.prop('side'),
      parseCode
    ),
    R.F
  )(checkBy)
}

export default R.curry(detectCheck)
