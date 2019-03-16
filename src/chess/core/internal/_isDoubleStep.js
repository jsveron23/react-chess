import * as R from 'ramda'

const DOUBLE_STEP_TILES = {
  w: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
  b: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7']
}

/**
 * @param  {String}  tile
 * @param  {String}  side
 * @return {boolean}
 */
function _isDoubleStep (tile, side) {
  return R.includes(tile, DOUBLE_STEP_TILES[side])
}

export default R.curry(_isDoubleStep)
