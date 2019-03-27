import * as R from 'ramda'
import { lazy, parseInt10 } from '~/utils'

/**
 * Convert rank to y
 * @param  {String} rank
 * @return {Number}
 */
function convertRankToY (rank) {
  return R.compose(
    R.unless(R.allPass([R.gt(9), R.lte(0)]), lazy(-1)),
    parseInt10
  )(rank)
}

export default convertRankToY
