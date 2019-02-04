import { compose, split, reduce } from 'ramda'

/**
 * Parse tile name to file and rank
 * @param  {string} tile
 * @return {Object}
 */
function parseTileName (tile) {
  const _reduceFn = (acc, val) => {
    const key = /[1-9]/.test(val) ? 'rank' : 'file'

    return {
      ...acc,
      [key]: val
    }
  }

  return compose(
    reduce(_reduceFn, {}),
    split('')
  )(tile)
}

export default parseTileName
