import * as R from 'ramda'

/**
 * Get previous snapshot list
 * @param  {Array} past
 * @return {Array}
 */
function getPrevSnapshotList (past) {
  return R.compose(
    R.pluck('snapshot'),
    R.reverse
  )(past)
}

export default getPrevSnapshotList
