import * as R from 'ramda'
import { either, increase, decrease } from '~/utils'
import { parseCode, convertAxisToTile, convertTileToAxis } from '../helpers'

/**
 * Get finite movable tiles when check-state
 * TODO: optimize
 * @param  {String} checkTo
 * @param  {String} checkBy
 * @param  {String} piece
 * @param  {Array}  movableTiles
 * @return {String}
 */
function getFiniteMovableTiles (checkTo, checkBy, piece, movableTiles) {
  // true -> increase, false -> decrease
  const condCb = (a, b) => a < b
  const awaitEither = R.flip(either([increase, decrease]))(condCb)

  const { tile: checkToTile, side: checkToSide } = parseCode(checkTo)
  const { tile: checkByTile, side: checkBySide } = parseCode(checkBy)
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
    let byTo = []

    if ((x === 1 && y === 2) || (x === 2 && y === 1)) {
      meta = ['jumpover']

      byTo = [checkByTile]
    } else {
      if (x === y) {
        meta = ['diagonal']

        xList = awaitEither(xArgs)
        yList = awaitEither(yArgs)
      } else {
        meta = ['straight']

        if (checkByX === checkToX) {
          xList = R.times(() => checkByX, y)
          yList = awaitEither(yArgs)
        } else if (checkByY === checkToY) {
          xList = awaitEither(xArgs)
          yList = R.times(() => checkByY, x)
        }
      }

      byTo = R.compose(
        R.map(convertAxisToTile),
        R.zip
      )(xList, yList)
    }

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
          const diaX = checkByX < checkToX ? checkToX + 1 : checkToY - 1
          const diaY = checkByY < checkToY ? checkToY + 1 : checkToY - 1
          const rejectTile = convertAxisToTile([diaX, diaY])

          return R.compose(
            getKingMovableTiles,
            R.reduce((acc, tile) => (rejectTile === tile ? acc : [...acc, tile]), [])
          )(movableTiles)
        }

        default: {
          return getKingMovableTiles(movableTiles)
        }
      }
    }

    return R.intersection(movableTiles, byTo)
  }
}

export default R.curry(getFiniteMovableTiles)
