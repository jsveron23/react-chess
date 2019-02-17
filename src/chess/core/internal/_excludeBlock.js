import { curry, join, compose, prop as extract } from 'ramda'
import { createRegExp } from '~/utils'
import convertSnapshotToTiles from '../../helpers/convertSnapshotToTiles'
import findCode from '../../helpers/findCode'
import parseCode from '../../helpers/parseCode'

export function _createSnapshopRe (snapshot) {
  return compose(
    createRegExp,
    join('|'),
    convertSnapshotToTiles
  )(snapshot)
}

export const _getSide = curry(function _getSide (tile, snapshot) {
  return compose(
    extract('side'),
    parseCode,
    findCode(tile)
  )(snapshot)
})
