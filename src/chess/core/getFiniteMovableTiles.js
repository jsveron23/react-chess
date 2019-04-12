import * as R from 'ramda'
import { decide, increase, decrease } from '~/utils'
import { parseCode, convertAxisToTile, convertCodeToTile, convertTileToAxis } from '../helpers'

const parseCodeAlt = R.applySpec({
  tile: convertCodeToTile,
  side: R.compose(
    R.prop('side'),
    parseCode
  )
})

/**
 * Get finite movable tiles when check-state
 * TODO: optimize
 * @param  {String} piece
 * @param  {String} checkTo
 * @param  {String} checkBy
 * @param  {Array}  timeline
 * @param  {Array}  movableTiles
 * @return {String}
 */
function getFiniteMovableTiles (piece, checkTo, checkBy, timeline, movableTiles) {
  const awaitDecide = R.flip(decide([increase, decrease]))((a, b) => a < b)
  const { tile: checkToTile, side: checkToSide } = parseCodeAlt(checkTo)
  const { tile: checkByTile, side: checkBySide } = parseCodeAlt(checkBy)
  const shouldLimit = checkToSide !== checkBySide

  // double validation
  if (shouldLimit) {
    const { x: checkToX, y: checkToY } = convertTileToAxis(checkToTile)
    const { x: checkByX, y: checkByY } = convertTileToAxis(checkByTile)
    const x = Math.abs(checkByX - checkToX)
    const y = Math.abs(checkByY - checkToY)
    const xArgs = [checkByX, checkToX]
    const yArgs = [checkByY, checkToY]
    let xList = []
    let yList = []

    if (x === y) {
      xList = awaitDecide(xArgs)
      yList = awaitDecide(yArgs)
    } else {
      // TODO: Knight attck
      if (checkByX === checkToX) {
        xList = R.times(() => checkByX, y)
        yList = awaitDecide(yArgs)
      } else if (checkByY === checkToY) {
        xList = awaitDecide(xArgs)
        yList = R.times(() => checkByY, x)
      }
    }

    const byTo = R.compose(
      R.map(convertAxisToTile),
      R.zip
    )(xList, yList)

    if (piece === 'K') {
      if (byTo.length === 1) {
        return movableTiles
      } else {
        // TODO:
        // 1. remove behind tile
        // 2. King should detect predictable attacked on other movable tiles
        const detectIncludes = R.flip(R.includes)

        return R.reject(detectIncludes(byTo), movableTiles)
      }
    }

    console.log('by: ', [checkByX, checkByY])
    console.log('to: ', [checkToX, checkToY])
    console.log('byTo: ', byTo)

    return R.intersection(movableTiles)(byTo)
  }
}

export default R.curry(getFiniteMovableTiles)
