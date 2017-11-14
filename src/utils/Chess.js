import { Notations, Grid, Pieces } from '../config'

/**
 * Alias of Chess piece name
 * @type {Object}
 */
const Alias = {
  P: 'Pawn',
  R: 'Rook',
  N: 'Knight',
  B: 'Bishop',
  Q: 'queen',
  K: 'king'
}

/**
 * Chess Engine
 */
class Chess {
  static notations = Notations
  static files = Grid.files
  static ranks = Grid.ranks

  static getPieceName (piece) {
    return piece.length === 1
      ? Alias[piece]
      : piece
  }

  static getMovement (piece) {
    const Piece = Chess.getPieceName(piece)

    return Pieces[Piece.toLowerCase()].movement
  }

  static getSpecials (piece) {
    const Piece = Chess.getPieceName(piece)

    return Pieces[Piece.toLowerCase()].specials
  }

  /**
   * Get index number from file char (+1)
   * @param  {String} char
   * @return {Number}
   */
  static getFileIdx (char) {
    return Chess.files.join('').indexOf(char) + 1
  }

  /**
   * Get file char from index number (-1)
   * @param  {Number} idx
   * @return {String}
   */
  static getFile (idx) {
    return Chess.files.join('').charAt(idx - 1)
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
