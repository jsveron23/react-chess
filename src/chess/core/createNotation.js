import { curry } from 'ramda'
import { isExist } from '~/utils'
import { _diffSnapshot } from './internal/_createNotation'
import getSide from '../helpers/getSide'

/**
 * Create notation
 * @param  {Array} mergedSnapshots
 * @return {Array}
 */
function createNotation (mergedSnapshots) {
  const len = mergedSnapshots.length

  const reduceCb = (acc, snapshot, idx) => {
    const prevSnapshot = mergedSnapshots[idx + 1]

    if (isExist(prevSnapshot) && len > 1) {
      const { side, piece, file, rank } = _diffSnapshot(snapshot, prevSnapshot)
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

  return mergedSnapshots.reduce(reduceCb, [])
}

export default curry(createNotation)
