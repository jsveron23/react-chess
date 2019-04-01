/**
 * Parse tile name to file and rank
 * @param  {String} tile
 * @return {Object}
 */
function parseTile (tile) {
  const [file, rank] = tile.split('')

  return { file, rank }
}

export default parseTile
