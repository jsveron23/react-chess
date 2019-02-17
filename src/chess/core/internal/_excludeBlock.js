import { curry, join, compose, prop as extract } from 'ramda'
import { createRegExp } from '~/utils'
import convertSnapshotToTiles from '../../helpers/convertSnapshotToTiles'
import findCode from '../../helpers/findCode'
import parseCode from '../../helpers/parseCode'

/**
 * Create regular expression of snapshot (after converting to tiles)
 * @param  {Array}  snapshot
 * @return {RegExp}
 */
export function _createSnapshopRe (snapshot) {
  return compose(
    createRegExp,
    join('|'),
    convertSnapshotToTiles
  )(snapshot)
}

/**
 * Get side of tile of snapshot
 * @param  {string} tile
 * @param  {Array}  snapshot
 * @return {string}
 */
export const _getSide = curry(function _getSide (tile, snapshot) {
  return compose(
    extract('side'),
    parseCode,
    findCode(tile)
  )(snapshot)
})
