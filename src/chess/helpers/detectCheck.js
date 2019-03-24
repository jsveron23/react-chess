import * as R from 'ramda'
import detectOpponentByCode from './detectOpponentByCode'

/**
 * Detect is check?
 * TODO: check opponent is King
 * @param  {String}  side
 * @param  {String}  checkBy
 * @return {Boolean}
 */
function detectCheck (side, checkBy) {
  return detectOpponentByCode(side, checkBy)
}

export default R.curry(detectCheck)
