import * as R from 'ramda'
import diffSnapshot from './diffSnapshot'

/**
 * Get code changes after moving piece
 * @param  {Array}  snapshot
 * @param  {Array}  prevSnapshot
 * @return {Object}
 */
function getCodeChanges (snapshot, prevSnapshot) {
  const nextCode = diffSnapshot(snapshot, prevSnapshot)
  const prevCode = diffSnapshot(prevSnapshot, snapshot)

  return { nextCode, prevCode }
}

export default R.curry(getCodeChanges)
