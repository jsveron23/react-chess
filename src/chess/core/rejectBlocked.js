import { curry, compose, reduce, keys, map } from 'ramda'
import {
  convertAxisToTile,
  findSideByTile,
  createSnapshotRe
} from '~/chess/helpers'

/**
 * TODO: optimize
 * @param  {string}   turn
 * @param  {Array}    snapshot
 * @param  {Object}   movableWithDirection
 * @return {Function}
 */
function createMapCb (turn, snapshot, movableWithDirection) {
  const re = createSnapshotRe(snapshot)

  /**
   * @callback
   * @param  {string} directionKey
   * @return {Array}
   */
  return (directionKey) => {
    const axisList = movableWithDirection[directionKey]
    let firstContactEnemy = false // first enemy on a direction
    let foundBlock = false
    let prevX
    let prevY

    // checking in same direction
    return axisList.reduce((acc, axis) => {
      const tile = convertAxisToTile(axis)
      const side = findSideByTile(snapshot, tile)
      const isEnemy = side !== turn
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
}

/**
 * Get rid of blocked path
 * @param  {string} turn
 * @param  {Array}  snapshot
 * @param  {Object} movableWithDirection
 * @return {Array}
 */
function rejectBlocked (turn, snapshot, movableWithDirection) {
  const mapCb = createMapCb(turn, snapshot, movableWithDirection)

  return compose(
    reduce((acc, item) => [...acc, ...item], []),
    map(mapCb),
    keys
  )(movableWithDirection)
}

export default curry(rejectBlocked)
