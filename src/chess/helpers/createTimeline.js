import * as R from 'ramda'
import getPrevSnapshotList from './getPrevSnapshotList'

/**
 * Create timeline (snapshot list)
 * @param  {Array} presentSnapshot
 * @param  {Array} past
 * @return {Array}
 */
function createTimeline (presentSnapshot, past) {
  const prevSnapshotList = getPrevSnapshotList(past)

  return [presentSnapshot, ...prevSnapshotList]
}

export default R.curry(createTimeline)
