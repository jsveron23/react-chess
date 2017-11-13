class Chess {
  static getFileIdx (char) {
    return 'abcdefgh'.indexOf(char) + 1
  }

  static getFile (idx) {
    return 'abcdefgh'.charAt(idx - 1)
  }

  /**
   * Parse notations
   * @param  {String} notation
   * @return {Object}
   */
  static parseNotation (notation) {
    const [side, piece, ...position] = notation.split('')

    return { side, piece, position: position ? position.join('') : undefined }
  }

  /**
   * Movement only - No special movements
   * @param {String} piece
   */
  static getMovement (piece) {
    /**
     * Pawn
     * @type {Array}
     */
    const Pawn = [
      [0, 1]
    ]

    /**
     * Rook - vertical, horizontal
     * @type {Array}
     */
    const Rook = [
      [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
      [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0],
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
      [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]
    ]

    /**
     * Bishop - dragonal
     * @type {Array}
     */
    const Bishop = [
      [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7],
      [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7],
      [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7],
      [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]
    ]

    /**
     * Knight
     * @type {Array}
     */
    const Knight = [
      [-1, 2], [1, 2], [-1, -2], [1, -2],
      [-2, 1], [2, 1], [-2, -1], [2, -1]
    ]

    /**
     * Queen - vertical, horizontal, dragonal
     * @type {Array}
     */
    const Queen = [
      ...Rook,
      ...Bishop
    ]

    /**
     * King
     * @type {Array}
     */
    const King = [
      [0, 1], [1, 1], [1, 0], [1, -1],
      [0, -1], [-1, -1], [-1, 0], [-1, 1]
    ]

    const movements = {
      P: Pawn,
      R: Rook,
      B: Bishop,
      N: Knight,
      Q: Queen,
      K: King,
      Pawn,
      Rook,
      Bishop,
      Knight,
      Queen,
      King
    }

    return movements[piece]
  }
}

export default Chess
