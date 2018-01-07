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
  find: (notations) => (position) =>
    (notations.find((notation) => (notation.search(position) > -1))) || '',

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
  getNext: ({ currPosition, nextPosition, setAxis }) =>
    (prevNotations) => prevNotations.map((prevNotation) => {
      let nextNotation = prevNotation

      if (prevNotation.search(currPosition) > -1) {
        const { side, piece } = _parse(prevNotation)

        nextNotation = `${side}${piece}${nextPosition}`

        setAxis(prevNotation, nextNotation)
      }

      return nextNotation
    })
}

/**
 * Parse a notation
 * @param  {string} notation
 * @return {Object}
 */
function _parse (notation) {
  const [side, piece, ...position] = notation.split('')

  return {
    position: position ? position.join('') : undefined,
    side,
    piece
  }
}

export default Notations
