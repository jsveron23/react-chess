import * as R from 'ramda'
import getPrevSnapshotList from './getPrevSnapshotList'

/**
 * Create timeline (snapshot list)
 * @param  {Array} snapshot
 * @param  {Array} past
 * @return {Array}
 */
function createTimeline (snapshot, past) {
  const prevSnapshotList = getPrevSnapshotList(past)

  return [snapshot, ...prevSnapshotList]
}

export default R.curry(createTimeline)
