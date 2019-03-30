import * as R from 'ramda'
import { isEmpty } from '~/utils'

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
  return R.compose(
    R.unless(isEmpty.lazy(idx), R.prop(idx)),
    R.pluck('snapshot'),
    R.reverse
  )
}

const getPrevSnapshotList = createGetPrevSnapshotList()
getPrevSnapshotList.withIndex = createGetPrevSnapshotList

export default getPrevSnapshotList
