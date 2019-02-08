import {
  curry,
  join,
  compose,
  flatten,
  keys,
  map,
  prop as extract
} from 'ramda'
import {
  transformXY,
  transformLineupToTiles,
  getLineupItem,
  parseLineupItem,
  getSide
} from '~/chess/helpers'
import { createRegExp } from '~/utils'

/**
 * Get rid of blocking tiles path
 * @param  {string} turn
 * @param  {Array}  lineup
 * @param  {Object} movableWithDirection
 * @return {Array}
 */
function excludeBlock (turn, lineup, movableWithDirection) {
  const { diagonal, vertical, horizontal } = movableWithDirection

  console.log(movableWithDirection)

  const re = compose(
    createRegExp,
    join('|'),
    transformLineupToTiles
  )(lineup)

  const directionOnly = {
    diagonal: [...diagonal],
    vertical: [...vertical],
    horizontal: [...horizontal]
  }

  const _mapFn = (directionKey) => {
    const tiles = movableWithDirection[directionKey]
    let firstContactEnemy = false // first enemy on a direction
    let foundBlock = false
    let prevX
    let prevY

    // checking in same direction
    return tiles.reduce((acc, tile) => {
      const side = compose(
        extract('side'),
        parseLineupItem,
        getLineupItem(lineup)
      )(tile)
      const isEnemy = getSide(side) !== turn
      const isPieceStanding = re.test(tile)

      const { x, y } = transformXY(tile)
      const intervalX = Math.abs(x - prevX)
      const intervalY = Math.abs(y - prevY)

      // change direction inside direction
      // like left, right in same direction
      const isChangedDirection = intervalX > 1 || intervalY > 1

      if (isChangedDirection) {
        console.log('change direction!', tile)

        firstContactEnemy = false
        foundBlock = false
      }

      // NOTE: not to finish before saving those
      prevX = x
      prevY = y

      if (!foundBlock && !firstContactEnemy && isEnemy && isPieceStanding) {
        firstContactEnemy = true
        foundBlock = true

        console.log('first contact enemy!', tile)

        return [...acc, tile]
      }

      if (firstContactEnemy || foundBlock || isPieceStanding) {
        console.log('found block!', tile)

        firstContactEnemy = true
        foundBlock = true

        return acc
      }

      console.log('include into movable tiles!', tile)

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
