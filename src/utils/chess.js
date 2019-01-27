import { FILES, SIDE, MOVEMENTS } from '~/constants'
import { isEmpty, isExist, parseInt10 } from '~/utils'

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
    const x = parseFileNum(fileName)
    const y = parseRankNum(rankName)

    return mvs.map((mv) => {
      const [mvX, mvY] = mv
      const nextX = mvX + x
      const nextY = turn === 'white' ? mvY + y : y - mvY

      return [nextX, nextY]
    })
  }
}

function _getPureMovable (files) {
  /**
   * Get movable tiles
   * @param  {Array} movable
   * @return {Array}
   */
  return (movable) => {
    const filteredMovable = movable.reduce((acc, mvs) => {
      const [file, rank] = mvs
      const nextFile = files[file - 1]
      const nextTile = `${nextFile}${rank}`
      const inUndefined = isEmpty(nextFile)
      const nonTileName = rank === 0 || nextTile.indexOf('-') > -1

      if (inUndefined || nonTileName) {
        return acc
      }

      return [...acc, nextTile]
    }, [])

    return filteredMovable
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

function movableWithDirection (movableTiles) {
  return movableTiles.reduce(
    (acc, tile, idx) => {
      const { pending, lastKey } = acc
      const [currentFile, currentRank] = tile.split('')
      const currentFileNum = parseFileNum(currentFile)
      const currentRankNum = parseRankNum(currentRank)

      // TODO:
      // length 1 is not work (Pawn)

      // first or last
      if (isEmpty(pending)) {
        if (isExist(lastKey) && movableTiles.length === idx + 1) {
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

      const [pendingFile, pendingRank] = pending.split('')
      const pendingFileNum = parseFileNum(pendingFile)
      const pendingRankNum = parseRankNum(pendingRank)
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
    },
    {
      vertical: [],
      horizontal: [],
      diagonal: [],
      pending: '',
      lastKey: ''
    }
  )
}

export const parseFileNum = _parseFileNum(FILES)
export const parseRankNum = parseInt10
export const getSideBy = _getSideBy(SIDE)
export const getPureMovable = _getPureMovable(FILES)
export const getMovementsTiles = _getMovementsTiles(MOVEMENTS)
export { getFileRankName, getNextNotations, movableWithDirection }
