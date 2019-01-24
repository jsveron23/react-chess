import { FILES } from '~/constants'
import { parseInt10 } from '~/utils'

/**
 * File name to number
 * @param  {Array}    file
 * @return {Function}
 */
function _parseFileNum (file) {
  return (fileName) => file.indexOf(fileName) + 1
}

/**
 * Get file and rank name
 * @param  {string} tileName
 * @return {Object}
 */
export function getFileRankName (tileName) {
  const tileArr = tileName.split('')

  if (tileArr.length > 2) {
    return {}
  }

  return tileArr.reduce((acc, name) => {
    const keyName = /[1-9]/.test(name) ? 'rankName' : 'fileName'

    return {
      ...acc,
      [keyName]: name
    }
  }, {})
}

export const parseFileNum = _parseFileNum(FILES)

/**
 * Rank name to number
 * @param  {string} rankName
 * @return {number}
 */
export const parseRankNum = (rankName) => parseInt10(rankName)
