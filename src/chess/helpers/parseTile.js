import * as R from 'ramda'
import { lazy } from '~/utils'

/**
 * Parse tile name to file and rank
 * @param  {String} tile
 * @return {Object}
 */
function parseTile (tile) {
  return R.compose(
    R.reduce((acc, char) => {
      const key = R.ifElse(R.test(/[1-9]/), lazy('rank'), lazy('file'))(char)

      return {
        ...acc,
        [key]: char
      }
    }, {}),
    R.split('')
  )(tile)
}

export default parseTile
