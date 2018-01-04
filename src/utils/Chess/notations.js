/**
 * Notations
 */
const Notations = {
  parse: _parse,

  /**
   * Validate
   * @param  {String}  notation
   * @return {Boolean}
   */
  is: (notation) => /^[w|b][B|K|P|Q|R][a-h][1-8]$/.test(notation),

  /**
   * Find specific notation
   * @return {String}
   */
  find: (notations) => (position) => {
    const found = notations.find(notation => (notation.search(position) > -1))

    return found || ''
  },

  /**
   * Update notations
   * @return {Array}
   */
  update: ({
    notations = [],
    asEqual,
    updateTo
  }) => notations.map((notation) => (notation === asEqual ? updateTo : notation)),

  /**
   * Transform next notations
   * @return {Function}
   */
  transformNext: ({
    currPosition = '',
    nextPosition = '',
    cb = function () {}
  }) => (prevNotations) => prevNotations.map(prevNotation => {
    let nextNotation = prevNotation

    if (prevNotation.search(currPosition) > -1) {
      const { side, piece } = _parse(prevNotation)

      nextNotation = `${side}${piece}${nextPosition}`

      cb(prevNotation, nextNotation)
    }

    return nextNotation
  })
}

/**
 * Parse a notation
 * @param  {String} notation
 * @return {Object}
 */
function _parse (notation) {
  const [side, piece, ...position] = notation.split('')

  return { side, piece, position: position ? position.join('') : undefined }
}

export default Notations
