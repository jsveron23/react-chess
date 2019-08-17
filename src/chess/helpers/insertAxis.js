import * as R from 'ramda'
import convertTileToAxis from './convertTileToAxis'

/**
 * Insert into axis list that after converted tiles
 * @param  {Array} initialTileGroup
 * @param  {Array} tiles
 * @return {Array}
 */
function insertAxis (initialAxisList, tiles) {
  const isInvalid = R.compose(
    R.complement(R.is)(Array),
    R.nth(0)
  )(initialAxisList)
  let nextAxisList = [...initialAxisList]

  if (isInvalid) {
    nextAxisList = []
  }

  return tiles.reduce((acc, tile) => {
    const { x, y } = convertTileToAxis(tile)

    return [...acc, [x, y]]
  }, nextAxisList)
}

export default R.curry(insertAxis)
