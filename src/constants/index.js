/**
 * Redux
 * =====
 */

export const SET_NEXT = 'SET_NEXT'
export const REVERT = 'REVERT'

export const SET_AXIS = 'SET_AXIS'
export const SET_SCREEN = 'SET_SCREEN'
export const SET_COMMAND = 'SET_COMMAND'
export const SET_TURN = 'SET_TURN'
export const SET_MOVABLE = 'SET_MOVABLE'
export const SET_NOTATIONS = 'SET_NOTATIONS'
export const SET_RECORDS = 'SET_RECORDS'

export const RESET_MATCH = 'RESET_MATCH'
export const RESET_COMMAND = 'RESET_COMMAND'
export const RESET_MOVABLE = 'RESET_MOVABLE'
export const RESET_NOTATIONS = 'RESET_NOTATIONS'
export const RESET_RECORDS = 'RESET_RECORDS'

/**
 * CHESS
 * =====
 */

/** Short name of Piece */
export const INITIAL = Object.freeze({
  P: 'Pawn',
  R: 'Rook',
  N: 'Knight',
  B: 'Bishop',
  Q: 'Queen',
  K: 'King'
})

/** Chess piece color */
export const SIDE = Object.freeze({
  w: 'white',
  b: 'black',
  white: 'white',
  black: 'black'
})

/** Enemy piece color */
export const ENEMY = Object.freeze({
  w: 'black',
  b: 'white',
  white: 'black',
  black: 'white'
})

/** Alias */
export const ALIAS = Object.freeze({
  white: 'w',
  black: 'b'
})

/** Ranks */
export const RANKS = Object.freeze(['8', '7', '6', '5', '4', '3', '2', '1'])

/** Files */
export const FILES = Object.freeze(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])

/** RegExp, a notation */
export const REG_NOTATION = /^[w|b][B|K|P|Q|R][a-h][1-8]$/

/** Default simulate config */
export const SIMULATION_CONFIG = Object.freeze({ /* later */ })
