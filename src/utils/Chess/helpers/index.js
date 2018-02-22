import * as Utils from '@utils'
import {
  INITIAL,
  SIDE,
  ENEMY,
  ALIAS,
  FILES,
  REG_NOTATION
} from '../constants'
import Notations from './Notations'
import Records from './Records'
import Parser from './Parser'

export const getPieceName = (alias, initial = INITIAL) => initial[alias] || alias
export const getFile = (idx, files = FILES) => files.join('').charAt(idx - 1)
export const getFileIdx = (char, files = FILES) => files.join('').indexOf(char) + 1
export const getSide = (alias, side = SIDE) => side[alias] || alias
export const getEnemy = (side, enemy = ENEMY) => enemy[side] || side
export const getAlias = (side, alias = ALIAS) => alias[side] || side

export const updateRank = (turn, counts = 1) => {
  const isWhiteTurn = turn === 'white'

  return (tile) => {
    const [file, rank] = tile.split('')
    const updatedRank = isWhiteTurn
      ? parseInt(rank, 10) + counts
      : parseInt(rank, 10) - counts

    return `${file}${updatedRank}`
  }
}

export const transformMove = ({ turn, notations }) => {
  const getDiff = Utils.diff(notations)
  const isWhiteTurn = turn === 'white'
  const prevNotationsLen = notations.length
  let tempNotations = notations

  return (nextNotations) => {
    const nextNotationLen = nextNotations.length
    const isCaptured = prevNotationsLen !== nextNotationLen

    if (isCaptured) {
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
 * @alias
 * ======
 */
export const findNotation = Utils.findOne
export const findNotations = Utils.find
export const updateNotations = Utils.update

/**
 * Notations
 * =========
 */
export const isNotation = Notations.isValid(REG_NOTATION)
export const isThere = Notations.has
export const revertNotations = Notations.revert

/**
 * Records
 * =======
 */
export const detectTurn = Records.detectTurn
export const detectLastTurn = Records.detectLastTurn
export const isCompleteRec = Records.isCompleteRec
export const getMove = Records.getMove
