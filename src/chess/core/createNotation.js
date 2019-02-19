import { curry } from 'ramda'
import { isExist } from '~/utils'
import { diffSnapshot } from '~/chess/core'
import { getSide } from '~/chess/helpers'

function createReduceCb (snapshotList) {
  const len = snapshotList.length

  return (acc, snapshot, idx) => {
    const prevSnapshot = snapshotList[idx + 1]

    if (isExist(prevSnapshot) && len > 1) {
      const { side, piece, file, rank } = diffSnapshot(snapshot, prevSnapshot)
      const isCaptured = prevSnapshot.length !== snapshot.length

      // if (prevSnapshot.length !== snapshot.length) {
      //   capturedPiece = compose(
      //     extract('piece'),
      //     _diffSnapshot(prevSnapshot)
      //   )(snapshot)
      // }

      const tile = `${file}${rank}`
      const isPawn = piece === 'P'
      const sideAsKey = getSide(side)
      const notation = `${isPawn ? '' : piece}${isCaptured ? ' x ' : ''}${tile}`

      return [
        ...acc,
        {
          [sideAsKey]: notation
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
  const reduceCb = createReduceCb(mergedSnapshots)

  return mergedSnapshots.reduce(reduceCb, [])
}

export default curry(createNotation)
