/**
 * Transform notations to tiles
 * @param  {Array} notations
 * @return {Array}
 */
function transformNotationsToTiles (notations) {
  return notations.map((notation) => notation.substr(2, 2))
}

export default transformNotationsToTiles
