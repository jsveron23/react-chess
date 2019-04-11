import * as R from 'ramda'
import { isExist } from '~/utils'
import getMovableAxis from './getMovableAxis'
import getMovableTiles from './getMovableTiles'
import appendSpecialAxis from './appendSpecialAxis'
import rejectBlocked from './rejectBlocked'
import groupByDirection from './groupByDirection'
import { parseCode, findCode } from '../helpers'

/**
 * Get next movable
 * TODO: 'getSpecialAxisFn' should be merged with `getRegularAxisFn`
 * @param  {String}   type 'tiles', 'axis'
 * @param  {Function} getFlatArgs
 * @return {Array}
 */
function getNextMovable (type, getFlatArgs) {
  const { turn, movableAxis, timeline, special, side, tile, checkBy } = getFlatArgs()
  const [snapshot] = timeline

  if (type === 'axis') {
    return R.compose(
      getMovableAxis(tile, turn),
      R.prop('piece'),
      parseCode,
      findCode(snapshot)
    )(tile)
  }

  // TODO: optimize args length
  const getSpecialAxisFn = appendSpecialAxis(side, special, tile, checkBy, timeline)

  const getRegularAxisFn = R.compose(
    rejectBlocked(turn, snapshot),
    groupByDirection
  )

  return R.compose(
    getMovableTiles,
    R.ifElse(isExist.lazy(special), getSpecialAxisFn, getRegularAxisFn)
  )(movableAxis)
}

export default R.curry(getNextMovable)
