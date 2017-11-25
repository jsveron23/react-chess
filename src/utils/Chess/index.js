import { INITIAL, FILES } from '@constants'
import { initDouble, enPassant } from './specials'
import { isExist } from '@utils'

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
  return n1.map((n, idx) => (n !== n2[idx] ? `${n} ${n2[idx]}` : '')).filter(n => !!n)
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
   * @param  {Number} x
   * @param  {Number} y
   * @return {String}
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

    return (nextX > 0 && nextY > 0 && !!fileChar) ? `${fileChar}${nextY}` : ''
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
  const removedPlacedTile = direction.map(d => (_isPiece({ notations, position: d }) ? 'you_shall_not_pass!!' : d))
  const start = removedPlacedTile.indexOf('you_shall_not_pass!!')

  // get rid of blocked direction
  start > -1 && removedPlacedTile.fill(undefined, start)

  // remove all undefined after running fill method
  return removedPlacedTile.filter(ofs => !!ofs)
}

/**
 * Routes special move method
 * @param  {Object} args
 * @param  {string} args.special
 * @param  {Array}  args.direction
 * @param  {string} args.key
 * @param  {string} args.position
 * @param  {Array}  args.records
 * @return {Array?}
 * TODO
 * - add notation to recognize special moves
 */
function _routeSpecials ({ special, direction, key, position, records }) {
  switch (`${special}-${key}`) {
    case 'initDouble-vertical': {
      return initDouble({ direction, position })
    }

    case 'enPassant-diagonal': {
      return enPassant({ direction, position, records })
    }

    default: {
      return undefined
    }
  }
}

/**
 * Calculate special movement
 * @param  {Object} args
 * @param  {Array}  args.direction
 * @param  {Array}  args.specials
 * @param  {string} args.key
 * @param  {string} args.position
 * @param  {Array}  args.records
 * @return {Array}
 */
function _detectSpecials ({ direction, specials, key, position, records }) {
  let nextDirection = direction.slice(0)
  let i = specials.length

  while (i--) {
    const special = specials[i]
    const specialMove = _routeSpecials({ direction, key, special, position, records })

    if (specialMove) {
      nextDirection = specialMove
    }
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
   * Check notation (validation)
   * TODO implement later
   * @param  {String}  notation
   * @return {Boolean}
   */
  static isNotation (notation) {
    return /^[w|b][B|K|P|Q|R][a-h][1-8]$/.test(notation)
  }

  /**
   * Logging...
   * @param  {Array} records
   * @param  {Array} prevNotations
   * @param  {Array} nextNotations
   * @return {Array}
   */
  static records (records, prevNotations, nextNotations) {
    const clone = records.slice(0)
    const ts = +new Date() // TODO implement later
    const notations = nextNotations
    const [last] = clone.reverse()

    // original ordering
    clone.reverse()

    if (!last || Object.keys(last).length === 2) {
      clone.push({
        white: {
          move: _diffNotations(prevNotations, nextNotations),
          notations,
          ts
        }
      })
    } else {
      clone.splice(-1, 1, {
        ...last,
        black: {
          move: _diffNotations(last.white.notations, nextNotations),
          notations,
          ts
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
   * @param  {Array}  args.records
   * @return {Array}
   */
  static calcMovablePath ({ movement, specials, piece, position, side, records }) {
    // create all direction for including special moves
    // e.g. Pawn: it has only vertical move but en-passant will diagonal move
    const movementObj = Object.assign({}, {
      vertical: [],
      horizontal: [],
      diagonal: []
    }, movement)

    // calculates movable path
    return Object.keys(movementObj).map(key => {
      const direction = movementObj[key]
      const includeSpecials = _detectSpecials({ direction, key, specials, position, records })

      if (isExist(includeSpecials)) {
        // excludes axis that out of Chessboard
        // each list has axis of 1 more directions (up, right, bottom, left)
        return includeSpecials
          .map(axisList => {
            return axisList
              .map(_includeAvailable({ side, position }))
              .filter(d => !!d)
          }).filter(a => (a.length !== 0))
      }
    }).filter(m => !!m)
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
    return movable.map(m => {
      return m.map(direction => {
        return (specials.indexOf('jumpover') === -1)
          ? _detectBlocked({ notations, direction })
          : _removeUnavailable({ notations, direction })
      })
    })
  }

  /**
   * Converts notations to axis number for animations
   * @param  {String}  prev
   * @param  {String}  next
   * @param  {Number?} pixelSize
   * @return {Object}
   * @description
   * c2 to c3
   * => [c(3) - c(3) = 0, 3 - 2 = 1]
   * => ([0, 1]) x pixel
   * => [0, 50]
   * => transform: translate(0px, 50px)
   * @description
   * b1 to h3
   * => [h(8) - b(2) = 6, 3 - 1 = 2]
   * => ([6, 2]) x pixel
   * => [300, 100]
   * => transform: translate(300px, 100px)
   */
  static convertAxis (prev, next, pixelSize = 50) {
    const { position: prevPosition } = _parseNotation(prev)
    const { position: nextPosition } = _parseNotation(next)
    const [prevFile, prevRank] = prevPosition.split('')
    const [nextFile, nextRank] = nextPosition.split('')

    return {
      x: (_getFileIdx(nextFile) - _getFileIdx(prevFile)) * pixelSize,
      y: (parseInt(nextRank, 10) - parseInt(prevRank, 10)) * pixelSize
    }
  }
}

export default Chess
