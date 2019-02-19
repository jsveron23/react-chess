import { compose, split, reduce } from 'ramda'

/**
 * @callback
 * @param  {Object} acc
 * @param  {string} txt
 * @return {Object}
 */
function reduceCb (acc, txt) {
  const key = /[1-9]/.test(txt) ? 'rank' : 'file'

  return {
    ...acc,
    [key]: txt
  }
}

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
    reduce(reduceCb, {}),
    split('')
  )(tile)
}

export default parseTile
