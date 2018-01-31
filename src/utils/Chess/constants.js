/**
 * Piece initial
 * @type {Object}
 */
export const INITIAL = Object.freeze({
  P: 'Pawn',
  R: 'Rook',
  N: 'Knight',
  B: 'Bishop',
  Q: 'Queen',
  K: 'King'
})

/**
 * Chess piece color
 * @type {Object}
 */
export const SIDE = Object.freeze({
  w: 'white',
  b: 'black',
  white: 'white',
  black: 'black'
})

/**
 * Enemy piece color
 * @type {Object}
 */
export const ENEMY = Object.freeze({
  w: 'black',
  b: 'white',
  white: 'black',
  black: 'white'
})

/**
 * Alias
 * @type {Object}
 */
export const ALIAS = Object.freeze({
  white: 'w',
  black: 'b'
})

/**
 * Ranks
 * @type {Array}
 * @readonly
 */
export const RANKS = Object.freeze(['8', '7', '6', '5', '4', '3', '2', '1'])

/**
 * Files
 * @type {Array}
 * @readonly
 */
export const FILES = Object.freeze(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])

/**
 * RegExp, a notation
 * @type {RegExp}
 */
export const REG_NOTATION = /^[w|b][B|K|P|Q|R][a-h][1-8]$/

/**
 * Default simulation config
 * @type {Object}
 */
export const SIMULATION_CONFIG = Object.freeze({
  targetPiece: 'K',
  action: 'CHECK',
  initialValue: {
    isChecked: false
  },

  /**
   * Pretend Queen's movement then target can see every direction
   * @type {String}
   */
  pretendPiece: 'Q'
})
