import { uniq } from 'ramda'
import { isEmpty } from '~/utils'

const initialObj = {
  // direction
  vertical: [],

  // direction
  horizontal: [],

  // direction
  diagonal: []
}

/**
 * Transform movable axis to directions
 * TODO: optimize logic
 * @param  {Array} movableAxis
 * @return {Array}
 */
function getDirection (movableAxis) {
  // to compare between previous tile and next tile
  let beforeAxis

  const withDirection = movableAxis.reduce((acc, axis) => {
    if (isEmpty(beforeAxis)) {
      beforeAxis = axis

      return acc
    }

    const [currentX, currentY] = axis
    const [beforeAxisX, beforeAxisY] = beforeAxis

    const x = Math.abs(beforeAxisX - currentX)
    const y = Math.abs(beforeAxisY - currentY)

    // e.g [1, 1], [2, 2], [3, 3]
    if (x === 1 && y === 1) {
      const { diagonal: prevDiagonal = [] } = acc
      const axisList = [beforeAxis, axis]

      beforeAxis = axis

      return {
        ...acc,
        diagonal: [...prevDiagonal, ...axisList]
      }
    }

    // e.g [0, 1] [0, 2], [0, 3]
    if (x === 0) {
      const { vertical: prevVertical = [] } = acc
      const axisList = [beforeAxis, axis]

      beforeAxis = axis

      return {
        ...acc,
        vertical: [...prevVertical, ...axisList]
      }
    }

    // e.g [1, 0] [2, 0] [3, 0]
    if (y === 0) {
      const { horizontal } = acc
      const axisList = [beforeAxis, axis]

      beforeAxis = axis

      return {
        ...acc,
        horizontal: [...horizontal, ...axisList]
      }
    }

    beforeAxis = axis

    return {
      ...acc
    }
  }, initialObj)

  return {
    vertical: uniq(withDirection.vertical),
    horizontal: uniq(withDirection.horizontal),
    diagonal: uniq(withDirection.diagonal)
  }
}

export default getDirection
