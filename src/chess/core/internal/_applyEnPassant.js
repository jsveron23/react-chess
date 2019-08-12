import * as R from 'ramda'
import { isExist, merge } from '~/utils'
import {
  findCodeByAxis,
  convertTileToAxis,
  diffSnapshot,
  parseCode,
  parseTile,
  convertRankToY
} from '../../helpers'

const getAxisAfterDiff = (aSnapshot, bSnapshot) => {
  return R.compose(
    convertTileToAxis,
    R.prop('tile'),
    parseCode,
    diffSnapshot(aSnapshot)
  )(bSnapshot)
}

/**
 * @TODO: optimize
 * @param  {String} side
 * @param  {String} tile
 * @param  {Array}  timeline
 * @return {Array}
 */
function _applyEnPassant (side, tile, timeline) {
  const [snapshot, prevSnapshot] = timeline
  const { x, y } = convertTileToAxis(tile)
  const diagonalRightAxis = side === 'w' ? [x + 1, y + 1] : [x - 1, y - 1]
  const diagonalLeftAxis = side === 'w' ? [x - 1, y + 1] : [x + 1, y - 1]
  let additionalAxis = []

  if (isExist(prevSnapshot)) {
    const { x: ss1X, y: ss1Y } = getAxisAfterDiff(snapshot, prevSnapshot)
    const { x: ss2X, y: ss2Y } = getAxisAfterDiff(prevSnapshot, snapshot)
    const addDSY = side === 'w' ? -2 : 2
    const isDoubleStepped = ss1Y === ss2Y + addDSY
    const isSameRank = y === ss1Y && Math.abs(x - ss2X) === 1

    if (isDoubleStepped && isSameRank) {
      const addAxisY = side === 'w' ? 1 : -1

      additionalAxis = [ss1X, ss1Y + addAxisY]
    }
  }

  const findCapturableTile = findCodeByAxis(snapshot)
  const rightTile = findCapturableTile(diagonalRightAxis)
  const leftTile = findCapturableTile(diagonalLeftAxis)

  return R.uniq([
    additionalAxis,
    ...[isExist(rightTile) ? diagonalRightAxis : []],
    ...[isExist(leftTile) ? diagonalLeftAxis : []]
  ])
}

/**
 * @TODO: optimize
 * @param  {String} side
 * @param  {String} tile
 * @param  {Array}  timeline
 * @return {string}
 */
function _changeSnapshot (side, tile, timeline) {
  const [snapshot, prevSnapshot] = timeline
  const idx = snapshot.findIndex(R.includes(tile))
  const beforeMovedCode = prevSnapshot[idx]
  const { file: beforeMovedFile } = parseCode(beforeMovedCode)
  const { file, rank } = parseTile(tile)
  const y = convertRankToY(rank)
  const isEnPassant = file !== beforeMovedFile

  if (isEnPassant) {
    const nextRank = y + (side === 'w' ? -1 : 1)
    const capturedTile = merge.txt(file, nextRank)

    return capturedTile
  }

  return ''
}

export const _applySnapshot = R.curry(_changeSnapshot)
export default R.curry(_applyEnPassant)
