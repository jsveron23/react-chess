/**
 * Initial notations
 * @type {Array}
 */
const Notations = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
]

/**
 * Define piece data
 * @type {Object}
 */
const Pieces = {
  pawn: {
    movement: [
      [0, 1]
    ],
    specials: ['initDouble', 'enPassant', 'promotion']
  },

  rook: {
    movement: [
      [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
      [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0],
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
      [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]
    ],
    specials: []
  },

  knight: {
    movement: [
      [-1, 2], [1, 2], [-1, -2], [1, -2],
      [-2, 1], [2, 1], [-2, -1], [2, -1]
    ],
    specials: ['jump']
  },

  bishop: {
    movement: [
      [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7],
      [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7],
      [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7],
      [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]
    ],
    specials: []
  },

  queen: {
    movement: [
      // vertical
      [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
      [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0],

      // horizontal
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
      [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7],

      // dragonal
      [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7],
      [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7],
      [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7],
      [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]
    ],
    specials: []
  },

  king: {
    movement: [
      [0, 1], [1, 1], [1, 0], [1, -1],
      [0, -1], [-1, -1], [-1, 0], [-1, 1]
    ],
    specials: ['castling']
  }
}

/**
 * Chess Engine
 */
class Chess {
  static initNotations = [...Notations]
  static pawn = Pieces.pawn
  static rook = Pieces.rook
  static knight = Pieces.knight
  static bishop = Pieces.bishop
  static queen = Pieces.queen
  static king = Pieces.king
  static board = {
    /**
     * Rank
     * @type {Array}
     * @static
     * @readonly
     */
    ranks: '87654321'.split(''),

    /**
     * File
     * @type {Array}
     * @static
     * @readonly
     */
    files: 'abcdefgh'.split('')
  }

  /**
   * Get index number from file char (+1)
   * @param  {String} char
   * @return {Number}
   */
  static getFileIdx (char) {
    return 'abcdefgh'.indexOf(char) + 1
  }

  /**
   * Get file char from index number (-1)
   * @param  {Number} idx
   * @return {String}
   */
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
   * Get movable path
   * @param  {Object} args
   * @param  {Array}  args.movement
   * @param  {string} args.position
   * @param  {string} args.side
   * @return {Array}
   */
  static calcMovablePath ({ movement, position, side }) {
    // get file, rank from position string
    const [file, rank] = position.split('')

    return movement.map(([x, y]) => {
      const fileIdx = Chess.getFileIdx(file)
      const nextX = x + fileIdx
      const nextY = side === 'w'
        ? y + parseInt(rank, 10)
        : parseInt(rank, 10) - y

      if (nextX >= 0 && nextY >= 0 && !!Chess.getFile(nextX)) {
        const nextPosition = `${Chess.getFile(nextX)}${nextY}`

        return nextPosition
      }
    }).filter(m => !!m)
  }
}

export default Chess
