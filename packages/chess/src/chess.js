/**
 * Rows
 * @type {Array}
 */
export const Rank = [8, 7, 6, 5, 4, 3, 2, 1];

/**
 * Columns
 * @type {Array}
 */
export const File = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const Turn = {
  w: 'white',
  b: 'black',
};

export const Side = {
  white: 'w',
  black: 'b',
  w: 'w',
  b: 'b',
};

export const Opponent = {
  white: 'black',
  black: 'white',
  w: 'black',
  b: 'white',
};

export const Vertical = 'Vertical';
export const Horizontal = 'Horizontal';
export const Diagonal = 'Diagonal';
export const Jumpover = 'Jumpover';

// prettier-ignore
export const Movement = {
  K: [
    [0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]
  ],

  B: [
    [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7],
    [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7],
    [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7],
    [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]
  ],

  N: [
    [-1, -2], [-1, 2], [1, -2], [1, 2], [-2, -1], [-2, 1], [2, -1], [2, 1]
  ],

  P: [
    [0, 1]
  ],

  Q: [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
    [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7],
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
    [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0],
    [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7],
    [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7],
    [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7],
    [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]
  ],

  R: [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
    [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7],
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
    [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]
  ]
};

// prettier-ignore
export const AxisGroupByDirection = {
  [Vertical]: {
    Up: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]],
    Down: [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]]
  },

  [Horizontal]: {
    Right: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]],
    Left: [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]]
  },

  [Diagonal]: {
    TopRight: [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]],
    BottomRight: [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]],
    TopLeft: [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]],
    BottomLeft: [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]]
  },

  [Jumpover]: {
    TopRight1: [[1, 2]],
    TopRight2: [[2, 1]],
    TopLeft1: [[-1, 2]],
    TopLeft2: [[-2, 1]],
    BottomRight1: [[1, -2]],
    BottomRight2: [[2, -1]],
    BottomLeft1: [[-1, -2]],
    BottomLeft2: [[-2, -1]]
  }
}

export const Special = {
  K: ['castling'],
  // N: ['jumpover'],
  P: ['double-step', 'en-passant', 'promotion'],
};

/**
 * 'bRa8' - black|Rook|a8
 * @type {Array}
 */
// prettier-ignore
export const Snapshot = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
];
