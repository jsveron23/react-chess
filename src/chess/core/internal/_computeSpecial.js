import { compose, curry, flip, prop as extract } from 'ramda'
import { isExist } from '~/utils'
import convertAxisToTile from '../../helpers/convertAxisToTile'
import findCode from '../../helpers/findCode'

export const _hasCode = curry(function _hasCode (snapshot, movableAxis) {
  return compose(
    isExist,
    flip(findCode)(snapshot),
    convertAxisToTile,
    extract(0)
  )(movableAxis)
})
