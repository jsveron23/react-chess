import * as Utils from '@utils'
import Notations from './notations'

/**
 * Archives of Chess records (per match)
 */
class Archives {
  static isWhiteTurned = _isWhiteTurned

  /**
   * Get move
   * @return {Array}
   */
  static getMove ({
    record = {},
    side = 'white'
  }) {
    const { move } = record[side]

    return move || []
  }

  /**
   * Save records data
   * @return {Array}
   */
  static save ({
    records = [],
    prevNotations = [],
    nextNotations = [],
    ts = +new Date() // TODO implement later
  }) {
    const lastItem = Utils.getLastItem(records, true)
    const isCompletedSingleRecord = Object.keys(lastItem || {}).length === 2
    const isNew = Utils.isEmpty(lastItem) || isCompletedSingleRecord
    const payload = {
      move: _transformMove({ n1: prevNotations, n2: nextNotations }),
      notations: nextNotations,
      ts
    }
    const data = isNew
      ? { white: payload }
      : { ...lastItem, black: payload }

    return Utils.push(records, data, isNew)
  }

  /**
   * Undo
   * +0.5 = undo 1 move from array
   * +1 = undo 2 moves from array
   * @return {Object}
   */
  static revert ({
    records = [],
    counts = 0.5
  }) {
    const len = records.length

    if (len === 0) {
      return {}
    }

    const lastItem = Utils.getLastItem(records, true)
    const { white, black } = lastItem
    const isWhite = _isWhiteTurned({ record: lastItem, rate: counts })
    const { notations, move } = _parseRecord({ record: isWhite ? white : black })
    const { before, after } = _parseMove({ move })
    const excludedLastItem = records.slice(0, -1)

    return {
      undoRecords: isWhite ? excludedLastItem : Utils.replaceLast(records, { white }),
      undoNotations: _revertNotations({ notations, before, after })
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
  return Notations.update({
    notations,
    asEqual: after,
    updateTo: before
  })
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

  return Utils.diet(diff)
}

export default Archives
