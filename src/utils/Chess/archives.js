import * as Utils from '@utils'

/**
 * Archives of Chess records (per match)
 */
class Archives {
  /**
   * Save records data
   * @return {Array}
   */
  static save ({
    records = [],
    prevNotations = [],
    nextNotations = [],
    ts = +new Date() // no need currently
  }) {
    const lastItem = Utils.getLastItem({ items: records, shouldStrip: true })
    const isCompletedSingleRecord = Object.keys(lastItem).length === 2
    const isNew = Utils.isEmpty(lastItem) || isCompletedSingleRecord
    const data = isNew ? {
      white: {
        move: _transformMove({ n1: prevNotations, n2: nextNotations }),
        notations: nextNotations,
        ts
      }
    } : {
      ...lastItem,
      black: {
        move: _transformMove({ n1: lastItem.white.notations, n2: nextNotations }),
        notations: nextNotations,
        ts
      }
    }

    return Utils.push({
      items: records,
      data,
      isNew
    })
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

    const lastItem = Utils.getLastItem({ items: records, shouldStrip: true })
    const { white, black } = lastItem
    const isWhite = _isWhiteTurn({ record: lastItem, rate: counts })
    const { notations, move } = _parseRecord({ record: isWhite ? white : black })
    const { before, after } = _parseMove({ move })
    const excludedLastItem = records.slice(0, -1)

    return {
      undoRecords: isWhite ? excludedLastItem : [...excludedLastItem, { white }],
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
function _isWhiteTurn ({
  record = {},
  // 1 turn => did white, black
  // 0.5 turn => white
  // TODO find more readability word to expanin
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
 * Revert a turn from notations
 * @return {Array}
 * TODO move to notations class
 */
function _revertNotations ({
  notations = [],
  before = '',
  after = ''
}) {
  return notations.map(notation => (notation === after ? before : notation))
}

/**
 * Return different moves between previous and currunt notations
 * @return {Array}
 * TODO move to notations class
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
