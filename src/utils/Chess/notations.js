import Chess from './'

/**
 * Notations
 * @namespace Notations
 */
const Notations = {
  parse: _parse,

  /**
   * Validate a notation
   * @param  {string}  notation
   * @return {boolean}
   */
  is: (notation) => /^[w|b][B|K|P|Q|R][a-h][1-8]$/.test(notation),

  /**
   * Find specific notation
   * @return {string}
   */
  find (notations) {
    return (position) => (notations.find((notation) => (notation.search(position) > -1))) || ''
  },

  /**
   * Update notations
   * @return {Array}
   */
  update ({ asEqual, updateTo }) {
    return (notations) => notations.map((notation) => (notation === asEqual ? updateTo : notation))
  },

  /**
   * Return next notations
   * @return {Function}
   */
  getNext ({ currPosition, nextPosition, setAxis }) {
    return (currNotations) => currNotations.map((notation) => {
      let nextNotation = notation

      if (notation.search(currPosition) > -1) {
        const getAxis = Chess.convertAxis(notation)
        const { side, piece } = _parse(notation)

        nextNotation = `${side}${piece}${nextPosition}`

        setAxis({ nextNotation, getAxis })
      }

      return nextNotation
    })
  }
}

/**
 * Parse a notation
 * @param  {string} notation
 * @return {Object}
 */
function _parse (notation) {
  const [side, piece, ...position] = notation.split('')

  return {
    position: position
      ? position.join('')
      : undefined,
    side,
    piece
  }
}

export default Notations
