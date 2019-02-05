/**
 * Transform lineup to tiles
 * @param  {Array} lineup
 * @return {Array}
 */
function transformLineupToTiles (lineup) {
  return lineup.map((item) => item.substr(2, 2))
}

export default transformLineupToTiles
