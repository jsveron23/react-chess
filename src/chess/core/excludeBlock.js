import { curry, join, compose, flatten, keys, map } from 'ramda'
import { transformXY, transformNotationsToTiles } from '~/chess/helpers'
import { createRegExp } from '~/utils'

/**
 * Get rid of blocking tiles path
 * @param  {Array}  notations
 * @param  {Object} movableWithDirection
 * @return {Array}
 */
function excludeBlock (notations, movableWithDirection) {
  const { diagonal, vertical, horizontal } = movableWithDirection

  const re = compose(
    createRegExp,
    join('|'),
    transformNotationsToTiles
  )(notations)

  const directionOnly = {
    diagonal: [...diagonal],
    vertical: [...vertical],
    horizontal: [...horizontal]
  }

  const _mapFn = (key) => {
    const tiles = movableWithDirection[key]
    let foundBlock = false
    let prevX
    let prevY

    // checking in same direction
    return tiles.reduce((acc, tile) => {
      const { x, y } = transformXY(tile)
      const intervalX = Math.abs(x - prevX)
      const intervalY = Math.abs(y - prevY)

      // change direction inside direction
      // like left, right but same direction
      if (intervalX > 1 || intervalY > 1) {
        foundBlock = false
      }

      prevX = x
      prevY = y

      if (foundBlock || re.test(tile)) {
        foundBlock = true

        return acc
      }

      return [...acc, tile]
    }, [])
  }

  return compose(
    flatten,
    map(_mapFn),
    keys
  )(directionOnly)
}

export default curry(excludeBlock)
