import * as R from 'ramda'
import { isEmpty } from '~/utils'
import _getDirection, {
  DIAGONAL,
  HORIZONTAL,
  VERTICAL
} from './internal/_getDirection'

const initialObj = {
  [DIAGONAL]: [],
  [HORIZONTAL]: [],
  [VERTICAL]: []
}

/**
 * Group by direction
 * @param  {Array} movableAxis
 * @return {Array}
 */
function groupByDirection (movableAxis) {
  // to compare between previous tile and current tile
  let beforeAxis

  const withDirection = movableAxis.reduce((acc, axis) => {
    const setDirectionKey = _getDirection(acc)
    let getDirection

    if (isEmpty(beforeAxis)) {
      beforeAxis = axis

      return acc
    }

    const [currentX, currentY] = axis
    const [beforeX, beforeY] = beforeAxis
    const x = Math.abs(beforeX - currentX)
    const y = Math.abs(beforeY - currentY)

    // TODO: resolve duplicate issue
    const axisList = [beforeAxis, axis]

    if (x === 1 && y === 1) {
      getDirection = setDirectionKey(DIAGONAL)
    } else if (x === 0) {
      getDirection = setDirectionKey(VERTICAL)
    } else if (y === 0) {
      getDirection = setDirectionKey(HORIZONTAL)
    } else {
      getDirection = setDirectionKey('')
    }

    beforeAxis = axis

    return getDirection(axisList)
  }, initialObj)

  return {
    [DIAGONAL]: R.uniq(withDirection[DIAGONAL]),
    [VERTICAL]: R.uniq(withDirection[VERTICAL]),
    [HORIZONTAL]: R.uniq(withDirection[HORIZONTAL])
  }
}

export default groupByDirection
