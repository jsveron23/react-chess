import { curry, join, compose, reduce, keys, map, prop as extract } from 'ramda'
import {
  transformSnapshotToTiles,
  transformAxisToTile,
  findSnapshotItem,
  parseSnapshotItem,
  getSide
} from '~/chess/helpers'
import { createRegExp } from '~/utils'

/**
 * Get rid of blocking tiles path
 * TODO: optimize
 * @param  {string} turn
 * @param  {Array}  snapshot
 * @param  {Object} movableWithDirection
 * @return {Array}
 */
function excludeBlock (turn, snapshot, movableWithDirection) {
  const { diagonal, vertical, horizontal } = movableWithDirection

  const re = compose(
    createRegExp,
    join('|'),
    transformSnapshotToTiles
  )(snapshot)

  const directionOnly = {
    diagonal: [...diagonal],
    vertical: [...vertical],
    horizontal: [...horizontal]
  }

  const _mapFn = (directionKey) => {
    const axisList = movableWithDirection[directionKey]
    let firstContactEnemy = false // first enemy on a direction
    let foundBlock = false
    let prevX
    let prevY

    // checking in same direction
    return axisList.reduce((acc, axis) => {
      const tile = transformAxisToTile(axis)
      const side = compose(
        extract('side'),
        parseSnapshotItem,
        findSnapshotItem(tile)
      )(snapshot)
      const isEnemy = getSide(side) !== turn
      const isPieceStanding = re.test(tile)

      const [x, y] = axis
      const intervalX = Math.abs(x - prevX)
      const intervalY = Math.abs(y - prevY)

      // change direction inside direction
      // like left, right in same direction
      const isChangedDirection = intervalX > 1 || intervalY > 1

      if (isChangedDirection) {
        firstContactEnemy = false
        foundBlock = false
      }

      // NOTE: not to finish before saving those
      prevX = x
      prevY = y

      if (!foundBlock && !firstContactEnemy && isEnemy && isPieceStanding) {
        firstContactEnemy = true
        foundBlock = true

        return [...acc, axis]
      }

      if (firstContactEnemy || foundBlock || isPieceStanding) {
        firstContactEnemy = true
        foundBlock = true

        return acc
      }

      return [...acc, axis]
    }, [])
  }

  return compose(
    reduce((acc, item) => [...acc, ...item], []),
    map(_mapFn),
    keys
  )(directionOnly)
}

export default curry(excludeBlock)
