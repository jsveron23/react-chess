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
 * TODO:
 * 1. optimize
 * 2. actually, it doesnt any validate for movableTiles
 * @param  {String} checkTo
 * @param  {String} checkBy
 * @param  {String} piece
 * @param  {Array}  movableTiles
 * @return {String}
 */
function getFiniteMovableTiles (checkTo, checkBy, piece, movableTiles) {
  console.log(movableTiles)
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
    let meta = []
    let xList = []
    let yList = []

    // TODO: Knight attck
    if (x === y) {
      meta = ['diagonal']
      xList = awaitDecide(xArgs)
      yList = awaitDecide(yArgs)
    } else {
      if (checkByX === checkToX) {
        meta = ['straight']
        xList = R.times(() => checkByX, y)
        yList = awaitDecide(yArgs)
      } else if (checkByY === checkToY) {
        meta = ['straight']
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
      }

      // TODO: King should detect predictable attacked on other movable tiles
      const getKingMovableTiles = R.compose(
        R.reject,
        R.flip(R.includes)
      )(byTo)

      const [direction] = meta

      switch (direction) {
        case 'straight': {
          return movableTiles.reduce((acc, tile) => {
            const { x, y } = convertTileToAxis(tile)

            if (x === checkByX || y === checkByY) {
              return acc
            }

            return [...acc, tile]
          }, [])
        }

        case 'diagonal': {
          let rejectAxis = []

          if (checkByX < checkToX && checkByY < checkToY) {
            // 'by(left down), to(right up)'
            rejectAxis = [checkToX + 1, checkToY + 1]
          } else if (checkByX > checkToX && checkByY < checkToY) {
            // by(right down), to(left up)
            rejectAxis = [checkToX - 1, checkToY + 1]
          } else if (checkByX > checkToX && checkByY > checkToY) {
            // 'by(right up), to(left down)'
            rejectAxis = [checkToX - 1, checkToY - 1]
          } else if (checkByX < checkToX && checkByY > checkToY) {
            // 'by(left up), to(right down)'
            rejectAxis = [checkToX + 1, checkToY - 1]
          }

          const rejectTile = convertAxisToTile(rejectAxis)

          return R.compose(
            getKingMovableTiles,
            R.reduce((acc, tile) => {
              if (rejectTile === tile) {
                return acc
              }

              return [...acc, tile]
            }, [])
          )(movableTiles)
        }

        default: {
          return getKingMovableTiles(movableTiles)
        }
      }
    }

    console.log('by: ', [checkByX, checkByY])
    console.log('to: ', [checkToX, checkToY])
    console.log('byTo: ', byTo)

    return R.intersection(movableTiles)(byTo)
  }
}

export default R.curry(getFiniteMovableTiles)
