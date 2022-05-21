/**
 * Parse tile
 * @param  {String} tileName
 * @return {Object}
 */
function parseTile(tileName) {
  const [fileName, rankName] = tileName.split('');

  return {
    rankName: Number(rankName),
    tileName,
    fileName,
  };
}

export default parseTile;
