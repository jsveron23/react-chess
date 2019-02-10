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

  const reduceFn = (acc, val) => {
    const key = /[1-9]/.test(val) ? 'rank' : 'file'

    return {
      ...acc,
      [key]: val
    }
  }

  return compose(
    reduce(reduceFn, {}),
    split('')
  )(tile)
}

export default parseTile
