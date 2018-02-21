import * as Utils from '@utils'
import {
  INITIAL,
  SIDE,
  ENEMY,
  ALIAS,
  FILES
} from '@constants'
import Notations from './Notations'
import Records from './Records'
import Parser from './Parser'

const _getPieceName = (initial = INITIAL) => (alias) => initial[alias] || alias
export const getPieceName = _getPieceName(/* replaceable */)

const _getFile = (files = FILES) => (idx) => files.join('').charAt(idx - 1)
export const getFile = _getFile(/* replaceable */)

const _getFileIdx = (files = FILES) => (char) => files.join('').indexOf(char) + 1
export const getFileIdx = _getFileIdx(/* replaceable */)

const _getSide = (side = SIDE) => (alias) => side[alias] || alias
export const getSide = _getSide(/* replaceable */)

const _getEnemy = (enemy = ENEMY) => (side) => enemy[side] || side
export const getEnemy = _getEnemy(/* replaceable */)

const _getAlias = (alias = ALIAS) => (side) => alias[side] || side
export const getAlias = _getAlias(/* replaceable */)

export const updateRank = (counts = 1) => (turn) => {
  const isWhiteTurn = turn === 'white'

  return (tile) => {
    const [file, rank] = tile.split('')
    const updatedRank = isWhiteTurn
      ? parseInt(rank, 10) + counts
      : parseInt(rank, 10) - counts

    return `${file}${updatedRank}`
  }
}

export const transformMove = (turn) => (notations) => {
  const getDiff = Utils.diff(notations)
  const len = notations.length
  let tempNotations = notations

  return (nextNotations) => {
    const isCaptured = len !== nextNotations.length

    if (isCaptured) {
      const isWhiteTurn = turn === 'white'
      const founds = getDiff(nextNotations)

      // NOTE
      // - if captured, comparing only between different notations (2 items)
      tempNotations = isWhiteTurn
        ? founds.slice(0).reverse()
        : founds
    }

    return tempNotations.reduce((move, notation, idx) => {
      if (isCaptured) {
        return Utils.isExist(move)
          ? `${move}x${notation}`
          : notation
      }

      const nextNotation = nextNotations[idx]
      const isDiff = notation !== nextNotation

      return isDiff
        ? `${notation} ${nextNotation}`
        : move
    }, '')
  }
}

export const countsHorizontalStep = (move) => {
  const _calcNotations = (prevNotation, currNotation) => {
    const prevFileIdx = getFileIdx(prevNotation.substr(-2, 1))
    const currFileIdx = getFileIdx(currNotation.substr(-2, 1))

    return currFileIdx - prevFileIdx
  }
  const steps = move
    .split(/\s|-|x/)
    .reduce(_calcNotations)

  return Math.abs(steps)
}

export const countsVerticalStep = (move) => {
  const _calcNotations = (prevNotation, currNotation) => {
    const prevRank = parseInt(prevNotation.substr(3, 1), 10)
    const currRank = parseInt(currNotation.substr(3, 1), 10)

    return currRank - prevRank
  }
  const steps = move
    .split(/\s|-|x/)
    .reduce(_calcNotations)

  return Math.abs(steps)
}

/**
 * Parser
 * ======
 */
export const parseNotation = Parser.notation({ getSide })
export const parsePosition = Parser.position
export const parseMove = Parser.move
export const parseLog = Parser.log

/**
 * @alias @utils
 * =============
 */
export const findNotation = Utils.findOne
export const findNotations = Utils.find
export const updateNotations = Utils.update

/**
 * Notations
 * =========
 */
export const isNotation = Notations.isValid()
export const isThere = Notations.has
export const revertNotations = Notations.revert

/**
 * Records
 * =======
 */
export const detectTurn = Records.detectTurn
export const detectLastTurn = Records.detectLastTurn
export const isCompleteRec = Records.isCompleteRec
export const getMove = Records.getMove({ parseLog })
