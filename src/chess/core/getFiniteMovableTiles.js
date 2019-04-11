import * as R from 'ramda'
import { lazy, increase, decrease } from '~/utils'
import { parseCode, convertAxisToTile, convertCodeToTile, convertTileToAxis } from '../helpers'

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
  const { side: checkToSide } = parseCode(checkTo)
  const checkToTile = convertCodeToTile(checkTo)
  const { side: checkBySide } = parseCode(checkBy)
  const checkByTile = convertCodeToTile(checkBy)
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

    // TODO:
    // implement for straight atack

    // diagonal attack
    if (x === y) {
      const throughIt = (a, b) => R.ifElse(lazy(a > b), decrease, increase)(a, b)

      xList = throughIt(...xArgs)
      yList = throughIt(...yArgs)
    } else {
      console.log('straight')
    }

    const byTo = R.compose(
      R.map(convertAxisToTile),
      R.zip
    )(xList, yList)

    if (piece === 'K') {
      if (byTo.length === 1) {
        return movableTiles
      } else {
        // TODO: remove behind tile
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
