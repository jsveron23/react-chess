import { compose, curry, reverse, pluck } from 'ramda'

/**
 * Create timeline (snapshot list)
 * @param  {Array} presentSnapshot
 * @param  {Array} past
 * @return {Array}
 */
function createTimeline (presentSnapshot, past) {
  const prevSnapshotList = compose(
    pluck('snapshot'),
    reverse
  )(past)

  return [presentSnapshot, ...prevSnapshotList]
}

export default curry(createTimeline)
