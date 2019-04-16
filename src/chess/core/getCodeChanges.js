import * as R from 'ramda'
import { isEmpty } from '~/utils'
import {
  findCode,
  parseCode,
  diffSnapshot,
  getMovement,
  convertAxisToTile,
  convertTileToAxis
} from '../helpers'

/**
 * Get code changes after moving piece
 * @param  {Array}  snapshot
 * @param  {Array}  prevSnapshot
 * @return {Object}
 */
function getCodeChanges (snapshot, prevSnapshot) {
  const nextCode = diffSnapshot(snapshot, prevSnapshot)
  let prevCode = diffSnapshot(prevSnapshot, snapshot)

  if (snapshot.length !== prevSnapshot.length) {
    const { x: nextX, y: nextY } = R.compose(
      convertTileToAxis,
      R.prop('tile'),
      parseCode
    )(nextCode)

    const { side, piece } = parseCode(nextCode)
    let axisList = getMovement(piece)

    // TODO: optimize
    if (piece === 'P') {
      axisList = [...axisList, [1, 1], [1, -1], [-1, 1], [-1, -1]]
    }

    const prevMovableTiles = axisList.map((axis) => {
      const [x, y] = axis
      const prevX = nextX + x
      const prevY = nextY - y

      return convertAxisToTile([prevX, prevY])
    })

    const prevTile = R.compose(
      R.find((tile) => findCode(prevSnapshot, `${side}${piece}${tile}`)),
      R.reject(isEmpty)
    )(prevMovableTiles)

    prevCode = `${side}${piece}${prevTile}`
  }

  return { nextCode, prevCode }
}

export default R.curry(getCodeChanges)
