import * as R from 'ramda'

const parseInt10 = (v) => parseInt(v, 10)

/**
 * Convert rank to y
 * @param  {String} rank
 * @return {Number}
 */
function convertRankToY (rank) {
  return R.compose(
    R.unless(R.allPass([R.lt(0), R.gte(8)]), () => -1),
    parseInt10
  )(rank)
}

export default convertRankToY
