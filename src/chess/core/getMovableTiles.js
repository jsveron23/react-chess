import { isEmpty } from '~/utils'
import { convertAxisToTile } from '~/chess/helpers'

/**
 * Get movable tiles
 * @param  {Array} movable
 * @return {Array}
 */
function getMovableTiles (movableAxis) {
  return movableAxis.reduce((acc, axis) => {
    const nextTile = convertAxisToTile(axis)

    if (isEmpty(nextTile)) {
      return acc
    }

    return [...acc, nextTile]
  }, [])
}

export default getMovableTiles
