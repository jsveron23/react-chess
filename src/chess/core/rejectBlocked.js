import * as R from 'ramda'
import { convertAxisToTile, findCodeByTile, detectRemainByAxis, getSide } from '../helpers'

/**
 * TODO: optimize
 * NOTE: not work if 1 length of Array
 * @param  {String}   turn
 * @param  {Array}    snapshot
 * @param  {Object}   movableByDirection
 * @return {Function}
 */
function createMapCb (turn, snapshot, movableByDirection) {
  const detectBlock = detectRemainByAxis(snapshot)
  const parseCodeByTile = findCodeByTile(snapshot)

  /**
   * @callback
   * @param  {String} directionKey
   * @return {Array}
   */
  return (directionKey) => {
    // axis direction (veritical, horizontal, diagonal)
    const axisList = movableByDirection[directionKey]

    // first enemy on a direction
    let firstContactEnemy = false

    let foundBlock = false
    let prevX
    let prevY

    return axisList.reduce((acc, axis) => {
      const isBlocked = detectBlock(axis)
      const isTeamMate = R.compose(
        R.equals(turn),
        getSide,
        R.prop('side'),
        parseCodeByTile,
        convertAxisToTile
      )(axis)

      const [x, y] = axis
      const intervalX = Math.abs(x - prevX)
      const intervalY = Math.abs(y - prevY)

      // change direction inside axis direction
      // like left, right
      const isChangedDirection = intervalX > 1 || intervalY > 1

      if (isChangedDirection) {
        firstContactEnemy = false
        foundBlock = false
      }

      prevX = x
      prevY = y

      // include block axis also to set capturable
      if (!foundBlock && !firstContactEnemy && !isTeamMate && isBlocked) {
        firstContactEnemy = true
        foundBlock = true

        return [...acc, axis]
      }

      if (firstContactEnemy || foundBlock || isBlocked) {
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
 * @param  {String} turn
 * @param  {Array}  snapshot
 * @param  {Object} movableByDirection
 * @return {Array}
 */
function rejectBlocked (turn, snapshot, movableByDirection) {
  const mapCb = createMapCb(turn, snapshot, movableByDirection)

  return R.compose(
    R.unnest,
    R.map(mapCb),
    R.keys
  )(movableByDirection)
}

export default R.curry(rejectBlocked)
