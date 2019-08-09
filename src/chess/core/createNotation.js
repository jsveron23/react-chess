import * as R from 'ramda'
import { isExist } from '~/utils'
import { parseCode, getTurn, diffSnapshot } from '../helpers'

/**
 * @param  {Array}    snapshotList
 * @return {Function}
 */
function createReduceCb (snapshotList) {
  /**
   * @callback
   * @param  {Array}  acc
   * @param  {Array}  snapshot
   * @param  {Number} idx
   * @return {Array}
   */
  return (acc, snapshot, idx) => {
    const prevSnapshot = snapshotList[idx + 1]
    const len = snapshot.length

    if (isExist(prevSnapshot)) {
      const prevLen = prevSnapshot.length
      const { side, piece, tile } = R.compose(
        parseCode,
        diffSnapshot(snapshot)
      )(prevSnapshot)
      const isCaptured = len + 1 === prevLen

      if (Math.abs(prevLen - len) > 1) {
        throw new Error('Something wrong, please investigate this!')
      }

      const isPawn = piece === 'P' && !isCaptured
      const capturedSymbol = isCaptured ? ' x ' : ''
      const notation = `${isPawn ? '' : piece}${capturedSymbol}${tile}`
      const turnAsKey = getTurn(side)

      return [
        ...acc,
        {
          [turnAsKey]: notation
        }
      ]
    }

    return acc
  }
}

/**
 * Create notation
 * @param  {Array} mergedSnapshots
 * @return {Array}
 */
function createNotation (mergedSnapshots) {
  const len = mergedSnapshots.length

  if (len === 1) {
    return []
  }

  const reduceCb = createReduceCb(mergedSnapshots)

  return mergedSnapshots.reduce(reduceCb, [])
}

export default R.curry(createNotation)
