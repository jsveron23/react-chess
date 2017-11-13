class Chess {
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
}

export default Chess
