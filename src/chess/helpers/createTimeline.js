import * as R from 'ramda'
import getPrevSnapshots from './getPrevSnapshots'

/**
 * Create timeline (snapshot list)
 * @param  {Array} snapshot
 * @param  {Array} past
 * @return {Array}
 */
function createTimeline (snapshot, past) {
  return R.compose(
    R.concat([snapshot]),
    getPrevSnapshots
  )(past)
}

export default R.curry(createTimeline)
