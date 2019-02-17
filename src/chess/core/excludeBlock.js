import { curry, compose, reduce, keys, map } from 'ramda'
import { _createSnapshopRe, _getSide } from './internal/_excludeBlock'
import convertAxisToTile from '../helpers/convertAxisToTile'
import getSide from '../helpers/getSide'

/**
 * Get rid of blocking tiles path
 * TODO: optimize
 * @param  {string} turn
 * @param  {Array}  snapshot
 * @param  {Object} movableWithDirection
 * @return {Array}
 */
function excludeBlock (turn, snapshot, movableWithDirection) {
  const re = _createSnapshopRe(snapshot)

  const mapCb = (directionKey) => {
    const axisList = movableWithDirection[directionKey]
    let firstContactEnemy = false // first enemy on a direction
    let foundBlock = false
    let prevX
    let prevY

    // checking in same direction
    return axisList.reduce((acc, axis) => {
      const tile = convertAxisToTile(axis)
      const side = _getSide(tile, snapshot)
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
    map(mapCb),
    keys
  )(movableWithDirection)
}

export default curry(excludeBlock)
