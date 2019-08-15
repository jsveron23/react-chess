import * as R from 'ramda'
import { lazy, merge } from '~/utils'
import getMovableAxis from './getMovableAxis'
import getNextMovable from './getNextMovable'
import { getSpecial, findCodeByTile } from '../helpers'

/**
 * @param  {String}   side
 * @param  {String}   checkBy
 * @param  {Array}    snapshot
 * @return {Function}
 */
function createReduceCb (side, snapshot, checkBy) {
  const parseTile = findCodeByTile(snapshot)

  /**
   * @callback
   * @param  {Object}  acc
   * @param  {String}  mt
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
      checkTo: merge.txt(mtSide, mtPiece, mt)
    }
  }
}

/**
 * Find check code
 * @param  {Function} getFlatArgs
 * @return {String}
 */
function findCheckCode (getFlatArgs) {
  const { turn, snapshot, side, piece, tile } = getFlatArgs()
  const checkCode = merge.txt(side, piece, tile)
  const reduceCb = createReduceCb(side, snapshot, checkCode)
  const initial = { side, tile }

  return R.compose(
    R.reduce(reduceCb, {}),
    getNextMovable('tiles'),
    lazy,
    merge({
      special: getSpecial(piece) || [],
      movableAxis: getMovableAxis(tile, turn, piece),
      timeline: [snapshot]
    })
  )(initial)
}

export default findCheckCode
