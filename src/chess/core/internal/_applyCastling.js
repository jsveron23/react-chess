import * as R from 'ramda'
import {
  isMoved,
  convertTileToAxis,
  isCheck as detectCheck
} from '../../helpers'

const KING_TILE = {
  w: 'Ke1',
  b: 'Ke8'
}

const ROOK_QSIDE_TILE = {
  w: 'Ra1',
  b: 'Rh8'
}

const ROOK_KSIDE_TILE = {
  w: 'Rh1',
  b: 'Ra8'
}

const IGNORE_TILES = ['b1', 'd8']

const QUEEN_SIDE = {
  w: ['b1', 'c1', 'd1'],
  b: ['f8', 'g8']
}

const KING_SIDE = {
  w: ['f1', 'g1'],
  b: ['b8', 'c8', 'd8']
}

/**
 * TODO: more conditions
 * @param  {String} side
 * @param  {String} checkBy
 * @param  {Array}  timeline
 * @return {Array}
 */
function _applyCastling (side, checkBy, timeline) {
  const detectMoved = isMoved(timeline)

  const kingCode = `${side}${KING_TILE[side]}`
  const isKingMoved = detectMoved(kingCode)

  const queenSideCode = `${side}${ROOK_QSIDE_TILE[side]}`
  const isLeftRookMoved = detectMoved(queenSideCode)

  const kingSideCode = `${side}${ROOK_KSIDE_TILE[side]}`
  const isRightRookMoved = detectMoved(kingSideCode)

  const isCheck = detectCheck(checkBy, side)

  if (!isCheck && !isKingMoved) {
    const [snapshot] = timeline
    let checkPath = []

    if (!isLeftRookMoved) {
      checkPath = QUEEN_SIDE[side]
    }

    if (!isRightRookMoved) {
      checkPath = checkPath.concat(KING_SIDE[side])
    }

    const ableToMove = snapshot.some((code) => !checkPath.includes(code))

    if (ableToMove) {
      return checkPath.reduce((acc, pathTile) => {
        if (IGNORE_TILES.includes(pathTile)) {
          return acc
        }

        const { x, y } = convertTileToAxis(pathTile)

        return [...acc, [x, y]]
      }, [])
    }
  }

  return []
}

export default R.curry(_applyCastling)
