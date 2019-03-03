import { compose, ifElse, thunkify, identity, find } from 'ramda'
import { getMovableAxis, getNextMovable } from '~/chess/core'
import { getSpecial, createTile, findCodeByTile } from '~/chess/helpers'
import { isExist } from '~/utils'

/**
 * @param  {Array}    snapshot
 * @param  {string}   side
 * @return {Function}
 */
function createFindCb (snapshot, side) {
  const parseTile = findCodeByTile(snapshot)

  /**
   * @callback
   * @param  {string}  mt
   * @return {boolean}
   */
  return (mt) => {
    const { piece: mtPiece, side: mtSide } = parseTile(mt)

    return mtPiece === 'K' && side !== mtSide
  }
}

/**
 * Find check code
 * @param  {Function} getFlatArgs
 * @return {string}
 */
function findCheckCode (getFlatArgs) {
  const { turn, snapshot, side, piece, file, rank } = getFlatArgs()

  const mapCb = createFindCb(snapshot, side)
  const tile = createTile(file, rank)
  const checkCode = `${side}${piece}${tile}`

  return compose(
    ifElse(isExist, thunkify(identity)(checkCode), thunkify(identity)('')),
    find(mapCb),
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
