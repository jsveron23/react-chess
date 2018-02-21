import * as Utils from '@utils'
import {
  INITIAL,
  SIDE,
  ENEMY,
  ALIAS,
  FILES
} from '@constants'
import Notations from './Notations'
import Positions from './Positions'
import Records from './Records'

export const getPieceName = (alias, initial = INITIAL) =>
  initial[alias] || alias

export const getFile = (idx, files = FILES) =>
  files.join('').charAt(idx - 1)

export const getFileIdx = (char, files = FILES) =>
  files.join('').indexOf(char) + 1

export const getSide = (alias, side = SIDE) =>
  side[alias] || alias

export const getEnemy = (side, enemy = ENEMY) =>
  enemy[side] || side

export const getAlias = (side, alias = ALIAS) =>
  alias[side] || side

export const increaseRank = (turn, counts = 1) => {
  const isWhiteTurn = turn === 'white'

  return (tile) => {
    const [file, rank] = tile.split('')
    const updatedRank = isWhiteTurn
      ? parseInt(rank, 10) + counts
      : parseInt(rank, 10) - counts

    return `${file}${updatedRank}`
  }
}

export const parseLog = ({ notations, move, ts }) => ({ notations, move, ts })

export const parseMove = (move) => {
  const [before, after] = move.split(/\s|-|x/) // ignore (+)

  return {
    before,
    after
  }
}

export const transformMove = (notations) => {
  const getDiff = Utils.diff(notations)

  return (turn) => (nextNotations) => {
    const isCaptured = notations.length !== nextNotations.length

    // same index
    // TODO optimize
    if (isCaptured) {
      const founds = getDiff(nextNotations)
      const isWhiteTurn = turn === 'white'
      const ordered = isWhiteTurn
        ? founds.slice(0).reverse()
        : founds

      return ordered.reduce((prevNotation, notation) => {
        // NOTE
        // - length === 2 means capture
        if (Utils.isExist(prevNotation)) {
          return `${prevNotation}x${notation}`
        }

        return notation
      }, '')
    }

    return notations.reduce((move, notation, idx) => {
      const nextNotation = nextNotations[idx]
      const isDiff = notation !== nextNotation

      return isDiff ? `${notation} ${nextNotation}` : move
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

export const isNotation = Notations.isValid
export const findNotation = Utils.findOne
export const findNotations = Utils.find
export const isThere = Notations.has
export const parseNotation = Notations.parse({ getSide })
export const updateNotations = Utils.update
export const revertNotations = Notations.revert
export const parsePosition = Positions.parse
export const detectTurn = Records.detectTurn
export const detectLastTurn = Records.detectLastTurn
export const isCompleteRec = Records.isCompleteRec
export const getMove = Records.getMove({ parseLog })
