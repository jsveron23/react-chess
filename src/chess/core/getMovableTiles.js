import * as R from 'ramda'
import { isEmpty, lazy } from '~/utils'
import { convertAxisToTile } from '../helpers'

const concatWithFlat = R.flip(R.append)

/**
 * @callback
 * @param  {Array} acc
 * @param  {Array} axis
 * @return {Array}
 */
function reduceCb (acc, axis) {
  return R.compose(
    R.ifElse(isEmpty, lazy(acc), concatWithFlat(acc)),
    convertAxisToTile
  )(axis)
}

/**
 * Get movable tiles
 * @param  {Array} movableAxis
 * @return {Array}
 */
function getMovableTiles (movableAxis) {
  return movableAxis.reduce(reduceCb, [])
}

export default getMovableTiles
