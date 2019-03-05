import { compose, curry, reverse, map } from 'ramda'

/**
 * Create timeline (snapshot list)
 * @param  {Array} presentSnapshot
 * @param  {Array} past
 * @return {Array}
 */
function createTimeline (presentSnapshot, past) {
  const pastSnapshotList = compose(
    map((pastIngame) => pastIngame.snapshot),
    reverse
  )(past)

  return [presentSnapshot, ...pastSnapshotList]
}

export default curry(createTimeline)
