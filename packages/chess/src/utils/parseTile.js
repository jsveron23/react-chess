export default function parseTile(tileName) {
  const [fileName, rankName] = tileName.split('');

  return {
    tileName,
    fileName,
    rankName,
  };
}
