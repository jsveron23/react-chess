import { compose, curry, ifElse, thunkify, prop } from 'ramda'
import {
  getMovableAxis,
  getMovableTiles,
  appendSpecialAxis,
  rejectBlocked,
  groupByDirection
} from '~/chess/core'
import { parseCode, findCode } from '~/chess/helpers'
import { isExist } from '~/utils'

/**
 * Get next movable
 * @param  {string}   type 'tiles', 'axis'
 * @param  {Function} getFlatArgs
 * @return {Array}
 */
function getNextMovable (type, getFlatArgs) {
  const { turn, movableAxis, timeline, special, side, tile } = getFlatArgs()
  const [snapshot] = timeline

  if (type === 'axis') {
    return compose(
      getMovableAxis(tile, turn),
      prop('piece'),
      parseCode,
      findCode(snapshot)
    )(tile)
  }

  const getSpecialAxisFn = appendSpecialAxis(side, special, tile, timeline)

  const getRegularAxisFn = compose(
    rejectBlocked(turn, snapshot),
    groupByDirection
  )

  return compose(
    getMovableTiles,
    ifElse(thunkify(isExist)(special), getSpecialAxisFn, getRegularAxisFn)
  )(movableAxis)
}

export default curry(getNextMovable)
