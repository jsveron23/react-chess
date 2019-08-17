import * as R from 'ramda'
import getPrevSnapshots from './getPrevSnapshots'

/**
 * Create timeline (snapshot list)
 * @param  {Array} snapshot
 * @param  {Array} past
 * @return {Array}
 */
function createTimeline (snapshot, past) {
  const prevSnapshots = getPrevSnapshots(past)
  const currSnapshot = [...snapshot]

  return [currSnapshot, ...prevSnapshots]
}

export default R.curry(createTimeline)
