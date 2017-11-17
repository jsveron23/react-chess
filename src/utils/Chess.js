/**
 * Chess Engine
 */
class Chess {
  /**
   * Notations
   * @type {Array}
   */
  static notations = [
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
    'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
    'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
  ]

  /**
   * Alias of Chess piece name
   * @type {Object}
   */
  static alias = {
    P: 'Pawn',
    R: 'Rook',
    N: 'Knight',
    B: 'Bishop',
    Q: 'Queen',
    K: 'King'
  }

  /**
   * Rank
   * @type {Array}
   */
  static ranks = '87654321'.split('')

  /**
   * File
   * @type {Array}
   */
  static files = 'abcdefgh'.split('')

  /**
   * Get piece name only
   * @param  {String} piece alias or fullname
   * @return {String}
   */
  static getPieceName (piece) {
    return piece.length === 1
      ? Chess.alias[piece]
      : piece
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
   * @param  {Object} args.movement
   * @param  {string} args.position
   * @param  {string} args.side
   * @return {Array}
   */
  static calcMovablePath ({ movement, position, side }) {
    // get file, rank from position string
    const [file, rank] = position.split('')
    const movable = Object.keys(movement).map(key => {
      // vertical, horizontal, dragonal
      const direction = movement[key]

      /**
       * The movement which configured in 'config.js' file are only showing X, Y axis
       * Which mean it does not tell you where Chess piece in board
       * Then just filtering outer axis of grid
       */
      const inSqares = direction.map(axisList => {
        return axisList.map(([x, y]) => {
          // current X index number
          const fileIdx = Chess.getFileIdx(file)

          // X is always same for each side
          // 1(a) + 1 = 2(b)
          const nextX = x + fileIdx

          // Y
          const nextY = side === 'w'
            ? y + parseInt(rank, 10)
            : parseInt(rank, 10) - y

          const fileChar = Chess.getFile(nextX)

          if (nextX > 0 && nextY > 0 && !!fileChar) {
            return `${fileChar}${nextY}`
          }
        }).filter(d => !!d)
      }).filter(a => (a.length !== 0))

      return inSqares
    })

    return movable
  }

  /**
   * Calculate movement
   * @param  {String}  prev
   * @param  {String}  next
   * @param  {Number?} pixelSize
   * @return {Object}
   * @example b2 to b3 => x0, y50 => transform: translate(0px, 50px)
   * @example b1 to h3 => x300, y100 => transform: translate(300px, 100px)
   */
  static calcAxis (prev, next, pixelSize = 50) {
    const prevNotation = Chess.parseNotation(prev)
    const nextNotation = Chess.parseNotation(next)
    const [prevFile, prevRank] = prevNotation.position.split('')
    const [nextFile, nextRank] = nextNotation.position.split('')

    return {
      x: (Chess.getFileIdx(nextFile) - Chess.getFileIdx(prevFile)) * pixelSize,
      y: (parseInt(nextRank, 10) - parseInt(prevRank, 10)) * pixelSize
    }
  }
}

export default Chess
