export const INITIAL = Object.freeze({
  P: 'Pawn',
  R: 'Rook',
  N: 'Knight',
  B: 'Bishop',
  Q: 'Queen',
  K: 'King'
})
export const SIDE = Object.freeze({
  w: 'white',
  b: 'black',
  white: 'white',
  black: 'black'
})
export const ENEMY = Object.freeze({
  w: 'black',
  b: 'white',
  white: 'black',
  black: 'white'
})
export const ALIAS = Object.freeze({
  white: 'w',
  black: 'b'
})
export const RANKS = Object.freeze(['8', '7', '6', '5', '4', '3', '2', '1'])
export const FILES = Object.freeze(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
export const REG_NOTATION = /^[w|b][B|K|P|Q|R][a-h][1-8]$/
export const SIMULATION_CONFIG = Object.freeze({ /* later */ })
