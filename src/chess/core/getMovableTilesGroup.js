import * as R from 'ramda'
import { lazy } from '~/utils'
import getFiniteMovableTiles from './getFiniteMovableTiles'
import getNextMovable from './getNextMovable'
import getMovableAxis from './getMovableAxis'
import { getSide, reduceSnapshotBySide, parseCode, getSpecial } from '../helpers'

function createReduceCb ({ checkTo, checkBy, turn, side, timeline }) {
  const awaitGetFiniteMovableTiles = getFiniteMovableTiles(checkTo, checkBy)

  return (acc, code) => {
    const { piece, tile } = parseCode(code)
    const special = getSpecial(piece)
    const preMovableAxis = getMovableAxis(tile, turn, piece)
    const preMovableTiles = R.compose(
      awaitGetFiniteMovableTiles(piece),
      getNextMovable('tiles'),
      lazy
    )({
      checkBy,
      timeline,
      turn,
      side,
      tile,
      special,
      movableAxis: preMovableAxis
    })

    return {
      ...acc,
      [code]: preMovableTiles
    }
  }
}

/**
 * Get finite movable tiles group
 * TODO: code works but only King return movable tiles not properly
 * @param  {String} turn
 * @param  {String} checkTo
 * @param  {String} checkBy
 * @param  {Array}  timeline
 * @return {Object}
 */
function getFiniteMovableTilesGroup (turn, checkTo, checkBy, timeline) {
  const side = getSide(turn)
  const reduceCb = createReduceCb({ checkTo, checkBy, turn, side, timeline })

  return R.compose(
    R.reduce(reduceCb, {}),
    reduceSnapshotBySide(side),
    R.nth(0)
  )(timeline)
}

export default R.curry(getFiniteMovableTilesGroup)
