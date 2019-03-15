import * as R from 'ramda'
import { isExist } from '~/utils'

/**
 * Get previous snapshot list
 * @param  {Number}   idx
 * @return {Function}
 */
function createGetPrevSnapshotList (idx) {
  /**
   * @param  {Array} past
   * @return {Array}
   */
  return (past) => {
    const prevSnapshotList = R.compose(
      R.pluck('snapshot'),
      R.reverse
    )(past)

    return isExist(idx) ? R.prop(idx, prevSnapshotList) : prevSnapshotList
  }
}

const getPrevSnapshotList = createGetPrevSnapshotList()
getPrevSnapshotList.withIndex = createGetPrevSnapshotList

export default getPrevSnapshotList
