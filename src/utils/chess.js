/**
 * Get file and rank name
 * @param  {string} tileName
 * @return {Object}
 */
export function getFileRankName (tileName) {
  const tileArr = tileName.split('')

  return tileArr.reduce((acc, name) => {
    const keyName = /[A-Z]/.test(name) ? 'rankName' : 'fileName'

    return {
      ...acc,
      [keyName]: name
    }
  }, {})
}
