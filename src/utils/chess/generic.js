import { compose, includes, split } from 'ramda'
import { FILES, SIDE, MOVEMENTS } from '~/constants'
import { getTilesBy } from '../internal/chess'

/**
 * Get side
 * @param  {string} key
 * @return {string}
 */
export const getSide = (key) => SIDE[key]

export const getFile = (file) => FILES[file - 1]

export const getMovements = (piece) => MOVEMENTS[piece]

/**
 * Transform file name as number
 * @param  {string} fileName
 * @return {number}
 */
export const transformFile = (fileName) => {
  const idx = FILES.indexOf(fileName)

  if (idx > -1) {
    return idx + 1
  }

  return idx
}

/**
 * Transform rank name as number
 * @param  {string} rankName
 * @return {number}
 */
export const transformRank = (rankName) => parseInt(rankName, 10)

/**
 * Parse selected piece to tile and side
 * @param  {string} selected
 * @return {Object}
 */
export const parseSelected = (selected) => {
  const [selectedTile, selectedSide] = split('-', selected)

  return { selectedTile, selectedSide }
}

/**
 * Parse tile name to file and rank
 * @param  {string} tileName
 * @return {Object}
 */
export const parseTileName = (tileName) => {
  if (tileName.length > 2) {
    return {}
  }

  const splitedTile = split('', tileName)

  return splitedTile.reduce((acc, name) => {
    const keyName = /[1-9]/.test(name) ? 'rankName' : 'fileName'

    return {
      ...acc,
      [keyName]: name
    }
  }, {})
}

export const isDarkBg = (fileName) =>
  compose(
    includes(fileName),
    getTilesBy
  )
