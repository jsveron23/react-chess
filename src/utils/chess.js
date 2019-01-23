export function getFileRankName (tileName) {
  const [fileName, rankName] = tileName.split('')

  return { fileName, rankName }
}
