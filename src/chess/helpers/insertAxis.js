import * as R from 'ramda'
import convertTileToAxis from './convertTileToAxis'

const isNot = R.complement(R.is)

const detectInvalidInitial = (initial) =>
  R.compose(
    isNot(Array),
    R.nth(0)
  )(initial)

/**
 * Insert into axis list that after converted tiles
 * @param  {Array} initial
 * @param  {Array} tiles
 * @return {Array}
 */
function insertAxis (initial, tiles) {
  const isInvalid = detectInvalidInitial(initial)

  if (isInvalid) {
    initial = []
  }

  return tiles.reduce((acc, tile) => {
    const { x, y } = convertTileToAxis(tile)

    return [...acc, [x, y]]
  }, initial)
}

export default R.curry(insertAxis)
