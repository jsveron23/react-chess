import * as R from 'ramda'

/**
 * Get previous snapshots only from past object
 * @param  {Array} past
 * @return {Array}
 */
function getPrevSnapshots (past) {
  return R.compose(
    R.pluck('snapshot'),
    R.reverse
  )(past)
}

export default getPrevSnapshots
