function transformNotationsToTiles (notations) {
  return notations.map((notation) => notation.substr(2, 2))
}

export default transformNotationsToTiles
