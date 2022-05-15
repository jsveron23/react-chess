/**
 * Parse tile
 * @param  {String} tileName
 * @return {Object}
 */
function parseTile(tileName) {
  const [fileName, rankName] = tileName.split('');

  return {
    tileName,
    fileName,
    rankName,
  };
}

export default parseTile;
