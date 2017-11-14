/**
 * Notations
 * @type {Array}
 */
const Notations = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
]

/**
 * Grid
 * @type {Object}
 */
const Grid = {
  /**
   * Rank
   * @type {Array}
   */
  ranks: '87654321'.split(''),

  /**
   * File
   * @type {Array}
   */
  files: 'abcdefgh'.split('')
}

/**
 * Pre-Define
 * @type {Object}
 */
const Pieces = {
  /**
   * Pawn
   * @type {Object}
   */
  pawn: {
    movement: [
      [0, 1]
    ],
    specials: ['initDouble', 'enPassant', 'promotion']
  },

  /**
   * Rook
   * @type {Object}
   */
  rook: {
    movement: [
      [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
      [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0],
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
      [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]
    ],
    specials: []
  },

  /**
   * Knight
   * @type {Object}
   */
  knight: {
    movement: [
      [-1, 2], [1, 2], [-1, -2], [1, -2],
      [-2, 1], [2, 1], [-2, -1], [2, -1]
    ],
    specials: ['jump']
  },

  /**
   * Bishop
   * @type {Object}
   */
  bishop: {
    movement: [
      [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7],
      [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7],
      [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7],
      [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]
    ],
    specials: []
  },

  /**
   * Queen
   * @type {Object}
   */
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

  /**
   * King
   * @type {Object}
   */
  king: {
    movement: [
      [0, 1], [1, 1], [1, 0], [1, -1],
      [0, -1], [-1, -1], [-1, 0], [-1, 1]
    ],
    specials: ['castling']
  }
}

export { Notations, Grid, Pieces }
