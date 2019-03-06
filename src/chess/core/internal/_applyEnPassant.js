import * as R from 'ramda'
import { isExist } from '~/utils'
import findCodeByAxis from '../../helpers/findCodeByAxis'
import convertTileToAxis from '../../helpers/convertTileToAxis'
import diffSnapshot from '../../helpers/diffSnapshot'
import parseCode from '../../helpers/parseCode'
import parseTile from '../../helpers/parseTile'
import convertRankToY from '../../helpers/convertRankToY'

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
  let additinalAxis = []

  if (isExist(prevSnapshot)) {
    const { file: ss1File, rank: ss1Rank } = diffSnapshot(
      snapshot,
      prevSnapshot
    )
    const { rank: ss2Rank } = diffSnapshot(prevSnapshot, snapshot)
    const { x: ss1X, y: ss1Y } = convertTileToAxis(`${ss1File}${ss1Rank}`)
    const ss2Y = convertRankToY(ss2Rank)
    const addDSY = side === 'w' ? -2 : 2
    const isDoubleStepped = ss1Y === ss2Y + addDSY
    const isSameRank = y === ss1Y

    if (isDoubleStepped && isSameRank) {
      const addAxisY = side === 'w' ? 1 : -1

      additinalAxis = [ss1X, ss1Y + addAxisY]
    }
  }

  const findCapturableTile = findCodeByAxis(snapshot)
  const rightTile = findCapturableTile(diagonalRightAxis)
  const leftTile = findCapturableTile(diagonalLeftAxis)

  return R.uniq([
    additinalAxis,
    ...[isExist(rightTile) ? diagonalRightAxis : []],
    ...[isExist(leftTile) ? diagonalLeftAxis : []]
  ])
}

/**
 * @TODO: optimize
 * @param  {string} side
 * @param  {string} tile
 * @param  {Array}  timeline
 * @return {string}
 */
function _changeSnapshot (side, tile, timeline) {
  const [snapshot, prevSnapshot] = timeline
  const idx = snapshot.findIndex((code) => code.includes(tile))
  const beforeMovedCode = prevSnapshot[idx]
  const { file: beforeMovedFile } = parseCode(beforeMovedCode)
  const { file, rank } = parseTile(tile)
  const y = convertRankToY(rank)
  const isEnPassant = file !== beforeMovedFile

  if (isEnPassant) {
    const capturedTile = `${file}${y + (side === 'w' ? -1 : 1)}`

    return capturedTile
  }

  return ''
}

export const _applySnapshot = R.curry(_changeSnapshot)
export default R.curry(_applyEnPassant)
