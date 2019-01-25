import { FILES, SIDE } from '~/constants'
import { parseInt10 } from '~/utils'

function _parseFileNum (file) {
  /**
   * File name to number
   * @param  {string} fileName
   * @return {number}
   */
  return (fileName) => {
    const idx = file.indexOf(fileName)

    return idx > -1 ? idx + 1 : idx
  }
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
 * @alias parseInt10
 */
export const parseRankNum = parseInt10

function _getSideBy (side) {
  return (key) => side[key]
}

export const getSideBy = _getSideBy(SIDE)
