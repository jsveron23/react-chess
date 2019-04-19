import * as R from 'ramda'
import getPrevSnapshotList from './getPrevSnapshotList'

/**
 * Create timeline (snapshot list)
 * @param  {Array} snapshot
 * @param  {Array} past
 * @return {Array}
 */
function createTimeline (snapshot, past) {
  return R.compose(
    R.concat([snapshot]),
    getPrevSnapshotList
  )(past)
}

export default R.curry(createTimeline)
