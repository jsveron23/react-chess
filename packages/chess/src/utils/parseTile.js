/**
 * Parse tile
 * @param  {String} tileName
 * @return {Object}
 */
export default function parseTile(tileName) {
  const [fileName, rankName] = tileName.split('');

  return {
    tileName,
    fileName,
    rankName,
  };
}
