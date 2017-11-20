import { FILES, INITIAL } from '@constants'

/**
 * Chess Engine
 * @namespace Chess
 */
const Chess = {
  /**
   * Get full name of Chess piece
   * @param  {String} piece alias or fullname
   * @return {String}       fullname
   */
  getPieceName (piece) {
    return INITIAL[piece] || piece
  },

  /**
   * Get file char from index number (-1)
   * @param  {Number} idx
   * @return {String}
   */
  getFile (idx) {
    return FILES.join('').charAt(idx - 1)
  },

  /**
   * Get index number from file char (+1)
   * @param  {String} char
   * @return {Number}
   */
  getFileIdx (char) {
    return FILES.join('').indexOf(char) + 1
  },

  /**
   * Logs momement
   * @param  {Array} n1
   * @param  {Array} n2
   * @return {Array}
   */
  aLog (n1, n2) {
    return n1.map((n, idx) => {
      if (n !== n2[idx]) {
        return `${n} ${n2[idx]}`
      }
    }).filter(n => !!n)
  },

  /**
   * Logging...
   * @param  {Array} archives
   * @param  {Array} prevNotations
   * @param  {Array} nextNotations
   * @return {Array}
   */
  archives (archives, prevNotations, nextNotations) {
    const clone = archives.slice(0)
    const [last] = clone.reverse()

    if (!last || Object.keys(last).length === 2) {
      clone.reverse().push({
        white: {
          ts: +new Date(),
          notations: nextNotations,
          move: this.aLog(prevNotations, nextNotations)
        }
      })
    } else {
      clone.reverse().splice(-1, 1, {
        ...last,
        black: {
          ts: +new Date(),
          notations: nextNotations,
          move: this.aLog(last.white.notations, nextNotations)
        }
      })
    }

    return clone
  },

  /**
   * Is any piece there?
   * @param  {Object}  args
   * @param  {Array}   args.notaions
   * @param  {String}  args.position
   * @return {Boolean}
   */
  isPiece ({ notations, position }) {
    return !!this.findNotation({ notations, position })
  },

  // /**
  //  * Check notation
  //  * @param  {String}  notation
  //  * @return {Boolean}
  //  */
  // isNotation (notation) {
  //   return /^[w|b][B|K|P|Q|R][a-h][1-8]$/.test(notation)
  // },

  /**
   * Parse notations
   * @param  {String} notation
   * @return {Object}
   */
  parseNotation (notation) {
    const [side, piece, ...position] = notation.split('')

    return { side, piece, position: position ? position.join('') : undefined }
  },

  /**
   * Get notation with using position
   * @param  {Object} args
   * @param  {Array}  notaions
   * @param  {String} position
   * @return {String}
   */
  findNotation ({ notations, position }) {
    return notations.find(n => (n.search(position) > -1)) || ''
  },

  /**
   * Includes only available path
   * @param  {Object}   args
   * @param  {string}   args.side
   * @param  {string}   args.position
   * @return {Function}
   */
  includeOnlyAvailablePath ({ side, position }) {
    // get file, rank from current position
    const [file, rank] = position.split('')

    // current X index number
    const fileIdx = this.getFileIdx(file)

    /**
     * @param  {Number}  x
     * @param  {Number}  y
     * @return {String?}
     */
    return ([x, y]) => {
      // X is always same for each side
      // 1(a) + 1 = 2(b)
      const nextX = x + fileIdx

      // Y
      const nextY = side === 'w'
        ? y + parseInt(rank, 10)
        : parseInt(rank, 10) - y

      const fileChar = this.getFile(nextX)

      if (nextX > 0 && nextY > 0 && !!fileChar) {
        return `${fileChar}${nextY}`
      }
    }
  },

  /**
   * Get movable path, not check blocked path here
   * @param  {Object} args
   * @param  {Object} args.movement
   * @param  {Object} args.specials
   * @param  {Object} args.piece
   * @param  {string} args.position
   * @param  {string} args.side
   * @return {Array}
   */
  calcMovablePath ({ movement, specials, piece, position, side }) {
    // calculates movable path
    const movable = Object.keys(movement).map(key => {
      // vertical, horizontal, dragonal
      const direction = movement[key]

      // excludes axis that out of Chessboard
      // each list has axis of 1 direction (up, right, bottom, left)
      return direction.map(axisList => {
        return axisList.map(this.includeOnlyAvailablePath({ side, position })).filter(d => !!d)
      }).filter(a => (a.length !== 0))
    })

    return movable
  },

  /**
   * Filter blocked path
   * @param  {Object} args
   * @param  {Array}  args.notations
   * @param  {Array}  args.movable
   * @param  {Array}  args.specials
   * @return {Array}
   */
  filterBlockedPath ({ notations, movable, specials }) {
    if (specials.indexOf('jumpover') === -1) {
      movable = movable.map(m => {
        return m.map(direction => this.detectBlockedDirection({ notations, direction }))
      })
    } else {
      movable = movable.map(m => {
        return m.map(direction => this.removePlacedTile({ notations, direction }))
      })
    }

    return movable
  },

  /**
   * Detect blocked direction
   * @param  {Object} args
   * @param  {Array}  args.notations
   * @param  {Array}  args.direction
   * @return {Array}
   */
  detectBlockedDirection ({ notations, direction }) {
    const removedPlacedTile = direction.map(d => (Chess.isPiece({ notations, position: d }) ? undefined : d))
    const start = removedPlacedTile.indexOf(undefined)

    // get rid of blocked direction
    start > -1 && removedPlacedTile.fill(undefined, start)

    return removedPlacedTile.filter(ofs => !!ofs)
  },

  /**
   * Remove placed tile
   * @param  {Object} args
   * @param  {Array}  args.notations
   * @param  {Array}  args.direction
   * @return {Array}
   */
  removePlacedTile ({ notations, direction }) {
    return direction.filter(d => !Chess.isPiece({ notations, position: d }))
  },

  /**
   * Calculate movement
   * @param  {String}  prev
   * @param  {String}  next
   * @param  {Number?} pixelSize
   * @return {Object}
   * @summary b2 to b3 => x0, y50 => transform: translate(0px, 50px)
   * @summary b1 to h3 => x300, y100 => transform: translate(300px, 100px)
   */
  calcAxis (prev, next, pixelSize = 50) {
    const prevNotation = this.parseNotation(prev)
    const nextNotation = this.parseNotation(next)
    const [prevFile, prevRank] = prevNotation.position.split('')
    const [nextFile, nextRank] = nextNotation.position.split('')
    const x = (this.getFileIdx(nextFile) - this.getFileIdx(prevFile)) * pixelSize
    const y = (parseInt(nextRank, 10) - parseInt(prevRank, 10)) * pixelSize

    return { x, y }
  }
}

export default Chess
