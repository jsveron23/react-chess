import * as R from 'ramda'
import { lazy } from '~/utils'

const parseInt10 = (v) => parseInt(v, 10)

/**
 * Convert rank to y
 * @param  {String} rank
 * @return {Number}
 */
function convertRankToY (rank) {
  const detectInvalidY = R.anyPass([R.gte(0), R.lt(8)])

  return R.compose(
    R.ifElse(detectInvalidY, lazy(-1), R.identity),
    parseInt10
  )(rank)
}

export default convertRankToY
