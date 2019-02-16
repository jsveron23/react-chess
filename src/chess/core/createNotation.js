import { difference, reduce, compose, curry, prop as extract } from 'ramda'
import { parseSnapshotItem, getSide } from '~/chess/helpers'
import { isExist } from '~/utils'

const getDiffrenceSnapshotItem = curry((aSnapshotItem, bsnapshotItem) => {
  return compose(
    parseSnapshotItem,
    extract(0),
    difference(aSnapshotItem)
  )(bsnapshotItem)
})

/**
 * Align moves before align score sheet
 * @param  {Array} mergedSnapshots
 * @return {Array}
 */
function createNotation (mergedSnapshots) {
  const len = mergedSnapshots.length

  const reduceFn = (acc, currSnapshot) => {
    const prevIdx = mergedSnapshots.indexOf(currSnapshot) + 1
    const prevSnapshot = mergedSnapshots[prevIdx]

    if (isExist(prevSnapshot) && len > 1) {
      let snapshotItemObj = getDiffrenceSnapshotItem(currSnapshot)(prevSnapshot)
      let capturedPiece = ''

      if (prevSnapshot.length !== currSnapshot.length) {
        const { piece } = getDiffrenceSnapshotItem(prevSnapshot)(currSnapshot)

        capturedPiece = piece
      }

      const { side, piece, file, rank } = snapshotItemObj
      const tile = `${file}${rank}`
      const isPawn = piece === 'P'
      const isCaptured = isExist(capturedPiece)
      const notation = `${isPawn ? '' : piece}${isCaptured ? 'x' : ''}${tile}`

      return [
        ...acc,
        {
          [getSide(side)]: notation
        }
      ]
    }

    return acc
  }

  return reduce(reduceFn, [])(mergedSnapshots)
}

export default curry(createNotation)
