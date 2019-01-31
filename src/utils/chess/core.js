import { split, curry } from 'ramda'
import { isEmpty, isExist } from '~/utils'
import {
  getMovements,
  getFile,
  parseTileName,
  parseSelected,
  transformFile,
  transformRank
} from './generic'

/**
 * Get axis from movements
 * @param  {string} tileName
 * @param  {string} piece
 * @param  {string} turn
 * @return {Array}
 */
export const getMvAxis = curry((tileName, piece, turn) => {
  const movements = getMovements(piece)
  const { rankName, fileName } = parseTileName(tileName)
  const x = transformFile(fileName)
  const y = transformRank(rankName)

  return movements.map((mv) => {
    const [mvX, mvY] = mv
    const nextX = mvX + x
    const nextY = turn === 'white' ? mvY + y : y - mvY

    return [nextX, nextY]
  })
})

/**
 * Get pure movable tiles
 * @param  {Array} movable
 * @return {Array}
 */
export const getPureMovable = (movable) => {
  return movable.reduce((acc, mvs) => {
    const [file, rank] = mvs
    const nextFile = getFile(file)
    const nextTile = `${nextFile}${rank}`
    const inUndefined = isEmpty(nextFile)

    // TODO: find out why it happens
    const nonTileName = rank === 0 || nextTile.indexOf('-') > -1

    if (inUndefined || nonTileName) {
      return acc
    }

    return [...acc, nextTile]
  }, [])
}

/**
 * Get next notations
 * @param  {string} selected
 * @param  {string} nextTileName
 * @param  {Array}  prevNotations
 * @return {Array}
 */
export const getNextNotations = curry(
  (selected, nextTileName, prevNotations) => {
    const { selectedTile } = parseSelected(selected)

    return prevNotations.reduce((acc, notation) => {
      if (notation.indexOf(selectedTile) > -1) {
        const [side, piece] = split('', notation)

        return [...acc, `${side}${piece}${nextTileName}`]
      }

      return [...acc, notation]
    }, [])
  }
)

export const transformMovableAsDirection = (movable) => {
  const initialObj = {
    vertical: [],
    horizontal: [],
    diagonal: [],
    pending: '',
    lastKey: ''
  }

  return movable.reduce((acc, tile, idx) => {
    const { pending, lastKey } = acc
    const [currentFile, currentRank] = split('', tile)
    const currentFileNum = transformFile(currentFile)
    const currentRankNum = transformRank(currentRank)

    // first or last
    if (isEmpty(pending)) {
      if (isExist(lastKey) && movable.length === idx + 1) {
        return {
          ...acc,
          [lastKey]: [...acc[lastKey], tile],
          pending: '',
          lastKey: ''
        }
      }

      return {
        ...acc,
        pending: tile
      }
    }

    const [pendingFile, pendingRank] = split('', pending)
    const pendingFileNum = transformFile(pendingFile)
    const pendingRankNum = transformRank(pendingRank)
    const x = Math.abs(pendingFileNum - currentFileNum)
    const y = Math.abs(pendingRankNum - currentRankNum)

    if (x === 1 && y === 1) {
      return {
        ...acc,
        diagonal: [...acc.diagonal, pending, tile],
        lastKey: 'diagonal',
        pending: ''
      }
    }

    if (x === 0) {
      return {
        ...acc,
        vertical: [...acc.vertical, pending, tile],
        lastKey: 'vertical',
        pending: ''
      }
    }

    if (y === 0) {
      return {
        ...acc,
        horizontal: [...acc.horizontal, pending, tile],
        lastKey: 'horizontal',
        pending: ''
      }
    }

    return {
      ...acc,
      [lastKey]: [...acc[lastKey], pending],
      pending: tile,
      lastKey: ''
    }
  }, initialObj)
}
