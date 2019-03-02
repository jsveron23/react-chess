import { compose, split, reduce } from 'ramda'

/**
 * Parse tile name to file and rank
 * @param  {string} tile
 * @return {Object}
 */
function parseTile (tile) {
  if (typeof tile !== 'string') {
    return tile
  }

  return compose(
    reduce((acc, txt) => {
      const key = /[1-9]/.test(txt) ? 'rank' : 'file'

      return {
        ...acc,
        [key]: txt
      }
    }, {}),
    split('')
  )(tile)
}

export default parseTile
