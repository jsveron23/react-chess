import { isEmpty, diet, push, getLastItem, replaceLast } from '@utils'
import Notations from './notations'

/**
 * Chess records (per match)
 * @namespace Records
 */
const Records = {
  isWhiteTurned: _isWhiteTurned,

  /**
   * Get move
   * @return {Array}
   */
  getMove ({
    record = {},
    side = 'white'
  }) {
    const { move } = record[side]

    return move || []
  },

  /**
   * Save records data
   * @param  {Array}    records
   * @param  {Array}    prevNotations
   * @return {Function}
   */
  save ({
    records = [],
    notations = [],
    ts = +new Date()
  }) {
    /**
     * @param  {Array} nextNotations
     * @return {Array}
     */
    return (nextNotations) => {
      const [lastItem] = getLastItem(records)
      const isCompletedSingleRecord = Object.keys(lastItem || {}).length === 2
      const isNew = isEmpty(lastItem) || isCompletedSingleRecord
      const payload = {
        move: _transformMove({ n1: notations, n2: nextNotations }),
        notations,
        ts
      }
      const data = isNew
        ? { white: payload }
        : { ...lastItem, black: payload }

      return push(records, data, isNew)
    }
  },

  /**
   * Undo
   * +0.5 = undo 1 move from array
   * +1 = undo 2 moves from array
   */
  revert: (records) => (counts = 0.5) => {
    const len = records.length

    if (len === 0) {
      return {}
    }

    const [lastItem] = getLastItem(records)
    const { white, black } = lastItem
    const isWhite = _isWhiteTurned({ record: lastItem, rate: counts })
    const { notations, move } = _parseRecord({ record: isWhite ? white : black })
    const { before, after } = _parseMove({ move })
    const excludedLastItem = records.slice(0, -1)

    return {
      revertedRecords: isWhite ? excludedLastItem : replaceLast(records, { white }),
      revertedNotations: _revertNotations({ notations, before, after })
    }
  }
}

/**
 * Parse single record
 * @return {Object}
 */
function _parseRecord ({
  record = {}
}) {
  const { notations, move, ts } = record

  return { notations, move, ts }
}

/**
 * Detect turn from last record item
 * @return {Boolean}
 */
function _isWhiteTurned ({
  record = {},
  // 1 turn => did white, black
  // 0.5 turn => white
  // TODO find more readability word to explain
  rate = 0.5
}) {
  return Object.keys(record).length * rate === 0.5
}

/**
 * Parse move from move item
 * @return {Object}
 */
function _parseMove ({
  move = [],
  separator = ' '
}) {
  const [stripped] = move
  const [before, after] = stripped.split(separator)

  return { before, after }
}

/**
 * Revert a turn
 * @return {Array}
 */
function _revertNotations ({
  notations = [],
  before = '',
  after = ''
}) {
  const applyUpdate = Notations.update({
    asEqual: after,
    updateTo: before
  })

  return applyUpdate(notations)
}

/**
 * Return different moves between previous and currunt notations
 * @return {Array}
 */
function _transformMove ({
  n1 = [],
  n2 = []
}) {
  const diff = n1.map((n, idx) => {
    return n !== n2[idx]
      ? `${n} ${n2[idx]}`
      : ''
  })

  return diet(diff)
}

export default Records
