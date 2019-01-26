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
function getFileRankName (tileName) {
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

function _getSideBy (side) {
  return (key) => side[key]
}

function _getMovementsTiles (movements) {
  /**
   * Get movements tiles
   * @param  {string}   tileName
   * @return {Function}
   */
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

function _getMovableTiles (files) {
  /**
   * Get movable tiles
   * @param  {Array} movements
   * @return {Array}
   */
  return (movements) => {
    return movements.map((mvs) => {
      const [file, rank] = mvs

      return `${files[file - 1]}${rank}`
    })
  }
}

/**
 * Get next notations
 * @param  {string}   selected
 * @return {Function}
 */
function getNextNotations (selected) {
  const [selectedTileName] = selected.split('-')

  return (nextTileName, prevNotations) => {
    const nextNotations = prevNotations.reduce((acc, notation) => {
      if (notation.indexOf(selectedTileName) > -1) {
        const [side, piece] = notation.split('')

        return [...acc, `${side}${piece}${nextTileName}`]
      }

      return [...acc, notation]
    }, [])

    return nextNotations
  }
}

export const parseFileNum = _parseFileNum(FILES)
export const parseRankNum = parseInt10
export const getSideBy = _getSideBy(SIDE)
export const getMovableTiles = _getMovableTiles(FILES)
export const getMovementsTiles = _getMovementsTiles(MOVEMENTS)
export { getFileRankName, getNextNotations }
