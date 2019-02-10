import { isEmpty } from '~/utils'
import { transformAxisToTile } from '~/chess/helpers'

/**
 * Get movable tiles
 * @param  {Array} movable
 * @return {Array}
 */
function getMovableTiles (movableAxis) {
  return movableAxis.reduce((acc, axis) => {
    const nextTile = transformAxisToTile(axis)

    if (isEmpty(nextTile)) {
      return acc
    }

    return [...acc, nextTile]
  }, [])
}

export default getMovableTiles
