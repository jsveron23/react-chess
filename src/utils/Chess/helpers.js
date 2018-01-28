import { isEmpty, isExist } from '@utils'
import {
  INITIAL,
  SIDE,
  ENEMY,
  ALIAS,
  FILES,
  REG_NOTATION
} from './constants'

// TODO
// - isBlocked({ notations, direction, position })
// - removeNotation({ ?? })

/**
 * Get full name of Chess piece
 * @param  {string}  alias
 * @param  {Object?} [initial=INITIAL]
 * @return {string}
 */
export function getPieceName (alias, initial = INITIAL) {
  return initial[alias] || alias
}

/**
 * Get file char from index number (-1)
 * @param  {number} idx
 * @param  {Array?} files
 * @return {string}
 */
export function getFile (idx, files = FILES) {
  return files
    .join('')
    .charAt(idx - 1)
}

/**
 * Get index number from file char (+1)
 * @param  {string} char
 * @param  {Array?} files
 * @return {number}
 */
export function getFileIdx (char, files = FILES) {
  return files
    .join('')
    .indexOf(char) + 1
}

/**
 * Get side
 * @param  {string}  alias
 * @param  {Object?} [side=SIDE]
 * @return {string}
 */
export function getSide (alias, side = SIDE) {
  return side[alias]
}

/**
 * Get enemy
 * @param  {string}  side
 * @param  {Object?} [enemy=ENEMY]
 * @return {string}
 */
export function getEnemy (side, enemy = ENEMY) {
  return enemy[side]
}

/**
 * Get alias
 * @param  {string}  side
 * @param  {Object?} [alias=ALIAS]
 * @return {string}
 */
export function getAlias (side, alias = ALIAS) {
  return alias[side] || side
}

/**
 * Is any piece there?
 * @param  {Array}    notations
 * @return {Function}
 */
export function isThere (notations) {
  const find = findNotation(notations)

  return (position) => !!find(position)
}

/**
 * Validate a notation
 * @param  {string}  notation
 * @param  {RegExp?} [reg=REG_NOTATION]
 * @return {boolean}
 */
export function isNotation (notation, reg = REG_NOTATION) {
  return reg.test(notation)
}

/**
 * Parse a notation
 * @param  {string?} notation
 * @return {Object}
 */
export function parseNotation (notation) {
  if (isEmpty(notation)) {
    return {}
  }

  const [side, piece, ...position] = notation.split('')

  return {
    position: position.join(''),
    side,
    piece
  }
}

/**
 * Find specific notation
 * @param  {Array}    notations
 * @return {Function}
 */
export function findNotation (notations) {
  return (position) => notations.find((notation) => (notation.search(position) > -1)) || ''
}

/**
 * Parse a position
 * @param  {Object|string} position
 * @return {Object}
 */
export function parsePosition (position) {
  if (typeof position === 'object') {
    position = position.position // for using 'compose'
  }

  const [file, rank] = position.split('')

  return { file, rank }
}

/**
 * Parse a log of side record
 * @param  {Object} log
 * @return {Object}
 */
export function parseLog (log) {
  const { notations, move, ts } = log

  return { notations, move, ts }
}

/**
 * Parse move from move item
 * @param  {Array} move
 * @return {Array}
 */
export function parseMove (move) {
  const [before, after] = move.split(' ')

  return { before, after }
}

/**
 * Update notations
 * @param  {string}   from
 * @param  {string}   to
 * @return {Function}
 */
export function updateNotations (from, to) {
  const update = (notation) => (notation === from ? to : notation)

  return (notations) => notations.map(update)
}

/**
 * Revert notaions (1 turn)
 * @param  {string}   before
 * @param  {string}   after
 * @return {Function}
 */
export function revertNotations (before, after) {
  const update = updateNotations(after, before)

  return (notations) => update(notations)
}

/**
 * Get move from a record
 * @param  {Object?}  [rec={}]
 * @return {Function}
 */
export function getMove (rec = {}) {
  return (side = 'white') => {
    const { move } = rec[side]

    return move || ''
  }
}

/**
 * Return different moves between previous and currunt notations
 * @return {Function}
 */
export function transformMove (notations) {
  return (nextNotations) => notations.reduce((move, notation, idx) => {
    const nextNotation = nextNotations[idx]
    const isDiff = notation !== nextNotation

    return isDiff ? `${notation} ${nextNotation}` : move
  }, '')
}

/**
 * Detect turn by a record (last item)
 * @param  {Object?} [rec={}]
 * @return {string}
 */
export function detectTurn (rec = {}) {
  const isCompletedRec = isCompletedRecord(rec)
  const isWhite = isEmpty(rec) || (isExist(rec) && isCompletedRec)

  return isWhite ? 'white' : 'black'
}

/**
 * Detect last turn by a record (last item)
 * @param  {Object?} [rec={}]
 * @return {string}
 */
export function detectLastTurn (rec = {}) {
  const { black } = rec

  return isExist(black) ? 'black' : 'white'
}

/**
 * Is a records has both(white, black) logs?
 * @param  {Object?} [rec={}]
 * @return {boolean}
 */
export function isCompletedRecord (rec = {}) {
  return Object.keys(rec).length === 2 // 0, 1 => incomplete
}

/**
 * More step of rank
 * @param  {string}   turn
 * @param  {number}   [counts=1]
 * @return {Function}
 */
export function increaseRank (turn, counts = 1) {
  const isWhiteTurn = turn === 'white'

  return (tile) => {
    const [file, rank] = tile.split('')
    const updatedRank = isWhiteTurn
      ? parseInt(rank, 10) + counts
      : parseInt(rank, 10) - counts

    return `${file}${updatedRank}`
  }
}

/**
 * Calculate how many step (file)
 * @param  {string} move
 * @return {number}
 */
export function getHowManyStepHorizontal (move) {
  const steps = move
    .split(' ')
    .reduce((prevNotation, currNotation) => {
      const prevFileIdx = getFileIdx(prevNotation.substr(-2, 1))
      const currFileIdx = getFileIdx(currNotation.substr(-2, 1))

      return currFileIdx - prevFileIdx
    })

  return Math.abs(steps)
}

/**
 * Calculate how many step (rank)
 * @param  {string} move
 * @return {number}
 */
export function getHowManyStepVertical (move) {
  const steps = move
    .split(' ')
    .reduce((prevNotation, currNotation) => {
      const prevRank = parseInt(prevNotation.substr(-1), 10)
      const currRank = parseInt(currNotation.substr(-1), 10)

      return currRank - prevRank
    })

  return Math.abs(steps)
}
