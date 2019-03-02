import { join, compose } from 'ramda'
import { createRegExp } from '~/utils'
import { convertSnapshotToTiles } from '~/chess/helpers'

/**
 * Create regular expression of tile list
 * @param  {Array}  snapshot
 * @return {RegExp}
 */
function createSnapshotRe (snapshot) {
  return compose(
    createRegExp,
    join('|'),
    convertSnapshotToTiles
  )(snapshot)
}

export default createSnapshotRe
