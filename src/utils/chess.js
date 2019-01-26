import { FILES, SIDE, MOVEMENTS } from '~/constants'
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

const _getMovementsTiles = (movements) => {
  return (tileName) => (piece) => (turn) => {
    const mvs = movements[piece]
    const { rankName, fileName } = getFileRankName(tileName)
    const [x, y] = [parseFileNum(fileName), parseRankNum(rankName)]

    return mvs.map((mv) => {
      const [mvX, mvY] = mv
      const nextX = mvX + x
      const nextY = turn === 'white' ? mvY + y : y - mvY

      return [nextX, nextY]
    })
  }
}

export const getMovementsTiles = _getMovementsTiles(MOVEMENTS)

function _getMovableTiles (files) {
  return (movements) => {
    return movements.map((mvs) => {
      const [file, rank] = mvs

      return `${files[file - 1]}${rank}`
    })
  }
}

export const getMovableTiles = _getMovableTiles(FILES)
