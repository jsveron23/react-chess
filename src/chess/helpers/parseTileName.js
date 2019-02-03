import { compose, split, reduce } from 'ramda'

/**
 * Parse tile name to file and rank
 * @param  {string} tileName
 * @return {Object}
 */
function parseTileName (tileName) {
  const _reduceFn = (tile, val) => {
    const key = /[1-9]/.test(val) ? 'rankName' : 'fileName'

    return {
      ...tile,
      [key]: val
    }
  }

  return compose(
    reduce(_reduceFn, {}),
    split('')
  )(tileName)
}

export default parseTileName
