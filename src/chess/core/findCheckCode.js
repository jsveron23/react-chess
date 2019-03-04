import { compose, reduce } from 'ramda'
import { getMovableAxis, getNextMovable } from '~/chess/core'
import { getSpecial, createTile, findCodeByTile } from '~/chess/helpers'

/**
 * @param  {string}   side
 * @param  {srring}   checkBy
 * @param  {Array}    snapshot
 * @return {Function}
 */
function createReduceCb (side, snapshot, checkBy) {
  const parseTile = findCodeByTile(snapshot)

  /**
   * @callback
   * @param  {Obhect}  acc
   * @param  {string}  mt
   * @return {boolean}
   */
  return (acc, mt) => {
    const { piece: mtPiece, side: mtSide } = parseTile(mt)
    const isCheckTo = mtPiece === 'K' && side !== mtSide // King

    if (!isCheckTo) {
      return acc
    }

    return {
      checkBy,
      checkTo: mt
    }
  }
}

/**
 * Find check code
 * @param  {Function} getFlatArgs
 * @return {string}
 */
function findCheckCode (getFlatArgs) {
  const { turn, snapshot, side, piece, file, rank } = getFlatArgs()
  const tile = createTile(file, rank)
  const checkCode = `${side}${piece}${tile}`
  const reduceCb = createReduceCb(side, snapshot, checkCode)

  return compose(
    reduce(reduceCb, {}),
    getNextMovable('tiles')
  )(() => {
    const nextMovableAxis = getMovableAxis(tile, turn, piece)
    const special = getSpecial(piece) || []

    return {
      timeline: [snapshot],
      movableAxis: nextMovableAxis,
      side,
      special,
      tile
    }
  })
}

export default findCheckCode
