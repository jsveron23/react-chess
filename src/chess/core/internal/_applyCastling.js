import * as R from 'ramda'
import {
  detectMoved,
  insertAxisByTiles,
  convertSnapshotToTiles,
  detectCheck
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

const IGNORE_AXIS_LIST = [[2, 1], [4, 8]]

const QUEEN_SIDE = {
  w: ['b1', 'c1', 'd1'],
  b: ['f8', 'g8']
}

const KING_SIDE = {
  w: ['f1', 'g1'],
  b: ['b8', 'c8', 'd8']
}

function isBlock (timeline, tiles) {
  const flippedSomeFn = R.compose(
    R.flip(R.any),
    convertSnapshotToTiles,
    R.prop(0)
  )(timeline)

  return R.compose(
    flippedSomeFn,
    R.flip(R.includes)
  )(tiles)
}

/**
 * TODO: more conditions
 * @param  {String} side
 * @param  {String} checkBy
 * @param  {Array}  timeline
 * @return {Array}
 */
function _applyCastling (side, checkBy, timeline) {
  const awaitDetectMoved = detectMoved(timeline)

  const isKingMoved = awaitDetectMoved(`${side}${KING_TILE[side]}`)
  const isLeftRookMoved = awaitDetectMoved(`${side}${ROOK_QSIDE_TILE[side]}`)
  const isRightRookMoved = awaitDetectMoved(`${side}${ROOK_KSIDE_TILE[side]}`)
  const isCheck = detectCheck(checkBy, side)
  let axisList = []

  if (!isCheck && !isKingMoved) {
    const queenSideTiles = QUEEN_SIDE[side]
    const kingSideTiles = KING_SIDE[side]
    const detectBlock = R.curry(isBlock)(timeline)
    const isQsTileBlocked = detectBlock(queenSideTiles)
    const isKsTilesBlocked = detectBlock(kingSideTiles)

    if (!isLeftRookMoved && !isQsTileBlocked) {
      axisList = insertAxisByTiles(axisList, queenSideTiles)
    }

    if (!isRightRookMoved && !isKsTilesBlocked) {
      axisList = insertAxisByTiles(axisList, kingSideTiles)
    }

    return R.without(IGNORE_AXIS_LIST, axisList)
  }

  return axisList
}

export default R.curry(_applyCastling)
