import { INITIAL, FILES } from '@constants'
import { initDouble } from './specials'

/**
 * Is any piece there?
 * @param  {Object}  args
 * @param  {Array}   args.notaions
 * @param  {String}  args.position
 * @return {Boolean}
 */
function _isPiece ({ notations, position }) {
  return !!_findNotation({ notations, position })
}

/**
 * Get file char from index number (-1)
 * @param  {Number} idx
 * @param  {Array?} files
 * @return {String}
 */
function _getFile (idx, files = FILES) {
  return files.join('').charAt(idx - 1)
}

/**
 * Get index number from file char (+1)
 * @param  {String} char
 * @param  {Array?} files
 * @return {Number}
 */
function _getFileIdx (char, files = FILES) {
  return files.join('').indexOf(char) + 1
}

/**
 * Parse notations
 * @param  {String} notation
 * @return {Object}
 */
function _parseNotation (notation) {
  const [side, piece, ...position] = notation.split('')

  return { side, piece, position: position ? position.join('') : undefined }
}

/**
 * Get notation with using position
 * @param  {Object} args
 * @param  {Array}  args.notaions
 * @param  {string} args.position
 * @return {String}
 */
function _findNotation ({ notations, position }) {
  return notations.find(n => (n.search(position) > -1)) || ''
}

/**
 * Return different moves between previous and currunt notations
 * @param  {Array} n1
 * @param  {Array} n2
 * @return {Array}
 */
function _diffNotations (n1, n2) {
  return n1.map((n, idx) => {
    if (n !== n2[idx]) {
      return `${n} ${n2[idx]}`
    }
  }).filter(n => !!n)
}

/**
 * Includes only available tiles
 * @param  {Object}   args
 * @param  {string}   args.side
 * @param  {string}   args.position
 * @return {Function}
 */
function _includeAvailable ({ side, position }) {
  // get file, rank from current position
  const [file, rank] = position.split('')

  // current X index number
  const fileIdx = _getFileIdx(file)

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

    const fileChar = _getFile(nextX)

    if (nextX > 0 && nextY > 0 && !!fileChar) {
      return `${fileChar}${nextY}`
    }
  }
}

/**
 * Remove placed tile
 * @param  {Object} args
 * @param  {Array}  args.notations
 * @param  {Array}  args.direction
 * @return {Array}
 */
function _removeUnavailable ({ notations, direction }) {
  return direction.filter(d => !_isPiece({ notations, position: d }))
}

/**
 * Detect blocked direction
 * @param  {Object} args
 * @param  {Array}  args.notations
 * @param  {Array}  args.direction
 * @return {Array}
 */
function _detectBlocked ({ notations, direction }) {
  const removedPlacedTile = direction.map(d => (_isPiece({ notations, position: d }) ? undefined : d))
  const start = removedPlacedTile.indexOf(undefined)

  // get rid of blocked direction
  start > -1 && removedPlacedTile.fill(undefined, start)

  return removedPlacedTile.filter(ofs => !!ofs)
}

/**
 * Calculate special movement
 * @param  {Object} args
 * @param  {Array}  args.direction
 * @param  {Array}  args.specials
 * @param  {string} args.key
 * @param  {string} args.position
 * @param  {Array}  args.archives
 * @return {Array}
 */
function _detectSpecials ({ direction, specials, key, position, archives }) {
  const movementList = { initDouble }
  let nextDirection = direction.slice(0)
  let i = specials.length

  while (i--) {
    const special = specials[i]
    const movementFn = movementList[special]

    // TODO switch

    nextDirection = movementFn ? [...movementFn(direction, key, position)] : nextDirection
  }

  return nextDirection
}

/**
 * Chess engine
 */
class Chess {
  static isPiece = _isPiece
  static getFile = _getFile
  static getFileIdx = _getFileIdx
  static parseNotation = _parseNotation
  static findNotation = _findNotation

  /**
   * Get full name of Chess piece
   * @param  {String}  piece alias or fullname
   * @param  {Object?} alias
   * @return {String}
   */
  static getPieceName (piece, alias = INITIAL) {
    return alias[piece] || piece
  }

  /**
   * TODO after attack!!
   */
  static removeNotation () {
    //
  }

  /**
   * Check notation
   * @param  {String}  notation
   * @return {Boolean}
   */
  static isNotation (notation) {
    return /^[w|b][B|K|P|Q|R][a-h][1-8]$/.test(notation)
  }

  /**
   * Logging...
   * @param  {Array} archives
   * @param  {Array} prevNotations
   * @param  {Array} nextNotations
   * @return {Array}
   */
  static records (archives, prevNotations, nextNotations) {
    const clone = archives.slice(0)
    const [last] = clone.reverse()

    // original ordering
    clone.reverse()

    if (!last || Object.keys(last).length === 2) {
      clone.push({
        white: {
          ts: +new Date(),
          notations: nextNotations,
          move: _diffNotations(prevNotations, nextNotations)
        }
      })
    } else {
      clone.splice(-1, 1, {
        ...last,
        black: {
          ts: +new Date(),
          notations: nextNotations,
          move: _diffNotations(last.white.notations, nextNotations)
        }
      })
    }

    return clone
  }

  /**
   * Get movable path, not check blocked path here
   * @param  {Object} args
   * @param  {Object} args.movement
   * @param  {Object} args.specials
   * @param  {Object} args.piece
   * @param  {string} args.position
   * @param  {string} args.side
   * @param  {Array}  args.archives
   * @return {Array}
   */
  static calcMovablePath ({ movement, specials, piece, position, side, archives }) {
    // calculates movable path
    const movable = Object.keys(movement).map(key => {
      // vertical, horizontal, dragonal
      const direction = movement[key]
      const clone = _detectSpecials({ direction: direction.slice(0), specials, key, position, archives })

      // excludes axis that out of Chessboard
      // each list has axis of 1 direction (up, right, bottom, left)
      return clone.map((axisList, idx) => {
        return axisList.map(_includeAvailable({ side, position })).filter(d => !!d)
      }).filter(a => (a.length !== 0))
    })

    return movable
  }

  /**
   * Filter blocked path
   * @param  {Object} args
   * @param  {Array}  args.notations
   * @param  {Array}  args.movable
   * @param  {Array}  args.specials
   * @return {Array}
   */
  static filterBlockedPath ({ notations, movable, specials }) {
    let filteredMovable

    if (specials.indexOf('jumpover') === -1) {
      filteredMovable = movable.map(m => {
        return m.map(direction => _detectBlocked({ notations, direction }))
      })
    } else {
      filteredMovable = movable.map(m => {
        return m.map(direction => _removeUnavailable({ notations, direction }))
      })
    }

    return filteredMovable
  }

  /**
   * Converts notations to axis number for animations
   * @param  {String}  prev
   * @param  {String}  next
   * @param  {Number?} pixelSize
   * @return {Object}
   * @summary b2 to b3 => x0, y50 => transform: translate(0px, 50px)
   * @summary b1 to h3 => x300, y100 => transform: translate(300px, 100px)
   */
  static convertAxis (prev, next, pixelSize = 50) {
    const { position: prevPosition } = _parseNotation(prev)
    const { position: nextPosition } = _parseNotation(next)
    const [prevFile, prevRank] = prevPosition.split('')
    const [nextFile, nextRank] = nextPosition.split('')
    const x = (_getFileIdx(nextFile) - _getFileIdx(prevFile)) * pixelSize
    const y = (parseInt(nextRank, 10) - parseInt(prevRank, 10)) * pixelSize

    return { x, y }
  }
}

export default Chess
