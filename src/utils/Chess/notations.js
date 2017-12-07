import * as Utils from '@utils'

/**
 * Notations
 */
class Notations {
  /**
   * Validate
   * @return {Boolean}
   */
  static is ({
    notation = ''
  }) {
    return /^[w|b][B|K|P|Q|R][a-h][1-8]$/.test(notation)
  }

  /**
   * Find specific notation
   * @return {String}
   */
  static find ({
    notations = [],
    position = '',
    cb = function () {}
  }) {
    cb = Utils.isExist(position)
      ? notation => (notation.search(position) > -1)
      : cb

    const found = notations.find(cb)

    return found || ''
  }

  /**
   * Update notations
   * @return {Array}
   */
  static update ({
    notations = [],
    asEqual,
    updateTo
  }) {
    return notations.map(function (notation) {
      return notation === asEqual ? updateTo : notation
    })
  }

  /**
   * Parse a notation
   * @return {Object}
   */
  static parse ({
    notation = ''
  }) {
    const [side, piece, ...position] = notation.split('')

    return { side, piece, position: position ? position.join('') : undefined }
  }
}

export default Notations
