import { uniq } from 'ramda'
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

    // TODO: resolve duplicate issue
    const axisList = [beforeAxis, axis]

    const x = Math.abs(beforeX - currentX)
    const y = Math.abs(beforeY - currentY)

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
    [DIAGONAL]: uniq(withDirection[DIAGONAL]),
    [VERTICAL]: uniq(withDirection[VERTICAL]),
    [HORIZONTAL]: uniq(withDirection[HORIZONTAL])
  }
}

export default groupByDirection
