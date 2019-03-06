import * as R from 'ramda'
import { lazy } from '~/utils'

/**
 * @param  {Function} getFlatArgs
 * @return {Array}
 */
function _getDoubleStepAxis (getFlatArgs) {
  const { x, y, side, movableAxis } = getFlatArgs()

  return R.compose(
    R.concat(movableAxis),
    R.of,
    R.concat([x]),
    R.of,

    // y ± 2 by side
    R.ifElse(lazy(side === 'w'), R.add(2), R.add(-2))
  )(y)
}

export default _getDoubleStepAxis
