import { INITIAL, FILES } from '@constants'
import { initDouble, enPassant } from './specials'
import { isExist } from '@utils'

/**
 * Is any piece there?
 * @param  {Object}  args
 * @param  {Array}   args.notaions
 * @param  {String}  args.position
 * @return {Boolean}
 * @access private
 */
function isPiece ({ notations, position }) {
  return !!findNotation({ notations, position })
}

/**
 * Get file char from index number (-1)
 * @param  {Number} idx
 * @param  {Array?} files
 * @return {String}
 * @access private
 */
function getFile (idx, files = FILES) {
  return files.join('').charAt(idx - 1)
}

/**
 * Get index number from file char (+1)
 * @param  {String} char
 * @param  {Array?} files
 * @return {Number}
 * @access private
 */
function getFileIdx (char, files = FILES) {
  return files.join('').indexOf(char) + 1
}

/**
 * Parse notations
 * @param  {String} notation
 * @return {Object}
 * @access private
 */
function parseNotation (notation) {
  const [side, piece, ...position] = notation.split('')

  return { side, piece, position: position ? position.join('') : undefined }
}

/**
 * Get notation with using position
 * @param  {Object} args
 * @param  {Array}  args.notaions
 * @param  {string} args.position
 * @return {String}
 * @access private
 */
function findNotation ({ notations, position }) {
  return notations.find(n => (n.search(position) > -1)) || ''
}

/**
 * Return different moves between previous and currunt notations
 * @param  {Array} n1
 * @param  {Array} n2
 * @return {Array}
 * @access private
 */
function diffNotations (n1, n2) {
  return n1.map((n, idx) => (n !== n2[idx] ? `${n} ${n2[idx]}` : '')).filter(n => !!n)
}

/**
 * Includes only available tiles
 * @param  {Object}   args
 * @param  {Array}    args.axis
 * @param  {string}   args.side
 * @param  {string}   args.position
 * @return {String}
 * @access private
 */
function excludeUnavailMoves ({ axis, side, position }) {
  const [x, y] = axis

  // get file, rank from current position
  const [file, rank] = position.split('')

  // current X index number
  const fileIdx = getFileIdx(file)

  // X: 1(a) + 1 = 2(b)
  const nextX = x + fileIdx

  // Y: upside down
  const nextY = side === 'w'
    ? y + parseInt(rank, 10)
    : parseInt(rank, 10) - y

  const fileChar = getFile(nextX)

  const isAvailMove = (nextX > 0 && nextY > 0 && !!fileChar)

  return isAvailMove ? `${fileChar}${nextY}` : ''
}

/**
 * Detect blocked direction
 * @param  {Object} args
 * @param  {Array}  args.specials
 * @param  {Array}  args.notations
 * @param  {Array}  args.direction
 * @return {Array}
 * @access private
 */
function excludeBlocking ({ specials, notations, direction }) {
  if (specials.includes('jumpover')) {
    return direction.filter(d => !isPiece({ notations, position: d }))
  }

  const removedPlacedTile = direction.map(d => (isPiece({ notations, position: d }) ? 'you_shall_not_pass!!' : d))
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
 * @access private
 * TODO
 * - add notation on records
 */
function routeSpecials ({ piece, special, direction, key, position, records }) {
  switch (`${piece}-${special}-${key}`) {
    case 'P-initDouble-vertical': {
      return initDouble({ direction, position })
    }

    case 'P-enPassant-diagonal': {
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
 * @access private
 */
function includeSpecialMoves ({ piece, direction, specials, key, position, records }) {
  let nextDirection = direction.slice(0)
  let i = specials.length

  while (i--) {
    const specialName = specials[i]
    const specialMove = routeSpecials({ piece, direction, key, special: specialName, position, records })

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
  static isPiece = isPiece
  static getFile = getFile
  static getFileIdx = getFileIdx
  static parseNotation = parseNotation
  static findNotation = findNotation

  /**
   * Detect movable path but it does not check blocking path
   * @param  {Object} args
   * @param  {Object} args.movement
   * @param  {Object} args.specials
   * @param  {Object} args.piece
   * @param  {string} args.position
   * @param  {string} args.side
   * @param  {Array}  args.records
   * @return {Array}
   */
  static detectMovablePath ({ movement, specials, piece, position, side, records }) {
    // create all direction for including special moves
    // ignore jump-over move (Knight)
    // e.g. Pawn moves forward but it can move diagonally when en-passant
    const extendMovement = Object.assign({}, {
      vertical: [],
      horizontal: [],
      diagonal: []
    }, movement)

    return Object.keys(extendMovement)
      // movable => direction => axisList => axis
      .map(key => {
        const direction = extendMovement[key]

        // added special direction
        const includedSpecialMoves = includeSpecialMoves({ piece, direction, key, specials, position, records })

        if (isExist(includedSpecialMoves)) {
          // excludes axis that out of Chessboard grid
          // each list contains 1 more direction (up, right, bottom, left)
          return includedSpecialMoves
            .map(axisList => {
              return axisList
                .map(axis => excludeUnavailMoves({ axis, side, position }))
                .filter(axis => !!axis)
            }).filter(axisList => (axisList.length !== 0))
        }
      }).filter(movable => !!movable)
  }

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
          move: diffNotations(prevNotations, nextNotations),
          notations,
          ts
        }
      })
    } else {
      clone.splice(-1, 1, {
        ...last,
        black: {
          move: diffNotations(last.white.notations, nextNotations),
          notations,
          ts
        }
      })
    }

    return clone
  }

  /**
   * Filter blocked path
   * @param  {Object} args
   * @param  {Array}  args.notations
   * @param  {Array}  args.movable
   * @param  {Array}  args.specials
   * @return {Array}
   */
  static excludeBlockedPath ({ notations, movable, specials }) {
    return movable.map(m => {
      return m.map(direction => excludeBlocking({ specials, notations, direction }))
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
    const { position: prevPosition } = parseNotation(prev)
    const { position: nextPosition } = parseNotation(next)
    const [prevFile, prevRank] = prevPosition.split('')
    const [nextFile, nextRank] = nextPosition.split('')

    // pixelSize means starting position of animation
    // the animation looks like moving a component
    // but it just re-render(re-created, state changed) and animated from starting position
    return {
      x: (getFileIdx(nextFile) - getFileIdx(prevFile)) * pixelSize,
      y: (parseInt(nextRank, 10) - parseInt(prevRank, 10)) * pixelSize
    }
  }
}

export default Chess
