import { initDouble, enPassant } from './specials'
import { isExist, diet } from '@utils'

/**
 * Ranks
 * @type {Array}
 * @readonly
 */
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1']

/**
 * Files
 * @type {Array}
 * @readonly
 */
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

/**
 * Alias
 * @type {Object}
 * @readonly
 */
const INITIAL = {
  P: 'Pawn',
  R: 'Rook',
  N: 'Knight',
  B: 'Bishop',
  Q: 'Queen',
  K: 'King'
}

// TODO
// implement!!
// - isBlocked({ notations, direction, position })
// - removeNotation({ ?? })

/**
 * Chess engine
 */
class Chess {
  static RANKS = RANKS
  static FILES = FILES

  static getFile = getFile
  static getFileIdx = getFileIdx

  /**
   * Get enemy
   * @param  {String} side
   * @return {Object}
   */
  static getEnemy (side) {
    const oppositeSide = {
      w: 'black',
      b: 'white',
      white: 'black',
      black: 'white'
    }

    return oppositeSide[side]
  }

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
    // add all direction for adding special moves while process
    // -> not add jump-over move (Knight)
    // e.g. Pawn moves straightly only but it can move diagonally when en-passant
    const extendMovement = Object.assign({}, {
      vertical: [],
      horizontal: [],
      diagonal: []
    }, movement)

    // transform standard movement to movable
    // - movement => group of direction that included group of axis (calculate)
    // - movable => group of tiles (readability, display)
    const movable = Object.keys(extendMovement).map(key => {
      // group of axis
      const direction = extendMovement[key]

      // added special direction
      const includedSpecialDirection = incSpecialDirection({ piece, direction, key, specials, position, records })

      if (isExist(includedSpecialDirection)) {
        const transformedDirection = includedSpecialDirection.map(axisList => transformTiles({ axisList, side, position }))

        return transformedDirection.filter(tiles => (tiles.length !== 0))
      }
    })

    return diet(movable)
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
    return movable.map(m => { // tile list of direction
      return m.map(tiles => removeBlocking({ specials, notations, tiles }))
    })
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

  static parseNotation = parseNotation
  static findNotation = findNotation

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
   * @param  {Array}  records
   * @param  {Array}  prevNotations
   * @param  {Array}  nextNotations
   * @param  {Number} ts            - timestamp
   * @return {Array}
   */
  static records (records, prevNotations, nextNotations, ts = +new Date()) {
    const [last] = records.slice(-1)
    const shouldAddItem = !last || Object.keys(last).length === 2

    return shouldAddItem
      ? records.concat({
        white: {
          move: diffNotations(prevNotations, nextNotations),
          notations: nextNotations,
          ts
        }
      })
      : [...records.slice(0, -1), {
        ...last,
        black: {
          move: diffNotations(last.white.notations, nextNotations),
          notations: nextNotations,
          ts
        }
      }]
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
   * TODO calculate pixelSize automatically
   */
  static convertAxis (prev, next, pixelSize = 50) {
    const { position: prevPosition } = parseNotation(prev)
    const { position: nextPosition } = parseNotation(next)
    const [prevFile, prevRank] = prevPosition.split('')
    const [nextFile, nextRank] = nextPosition.split('')

    // pixelSize means starting position of animation
    // the animation looks like moving a component
    // but it just re-render(re-created, state changed) and animated from starting position
    // pretend moving component
    return {
      x: (getFileIdx(nextFile) - getFileIdx(prevFile)) * pixelSize,
      y: (parseInt(nextRank, 10) - parseInt(prevRank, 10)) * pixelSize
    }
  }

  /**
   * Undo
   * @param  {Array}  records
   * @param  {Number} counts
   * @return {Object}
   */
  static undo ({ records, counts }) {
    const len = records.length

    if (len === 0) {
      return {}
    }

    const [last] = records.slice(-1)
    const { white, black } = last
    const isWhite = Object.keys(last).length * counts === 0.5
    const { notations, move } = isWhite ? white : black
    const [before, after] = move.join('').split(' ')
    const undoNotations = notations.map(notation => (notation === after ? before : notation))
    const excludeLast = records.slice(0, -1)
    const undoRecords = isWhite
      ? excludeLast // removed last item
      : [...excludeLast, { white: last.white }] // removed last item but add white move only

    return { undoRecords, undoNotations }
  }
}

/**
 * Is any piece there?
 * @param  {Object}  args
 * @param  {Array}   args.notaions
 * @param  {String}  args.position
 * @return {Boolean}
 * @access private
 */
function isPlaced ({ notations, position }) {
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
  const diff = n1.map((n, idx) => (n !== n2[idx] ? `${n} ${n2[idx]}` : ''))

  return diet(diff)
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
function fillAvailTilesOnly ({ axis, side, position }) {
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
 * @return {Array}                 - movable
 * @access private
 */
function removeBlocking ({ specials, notations, tiles }) {
  const removedPlaced = tiles.map(tile => {
    return isPlaced({ notations, position: tile }) ? 'you_shall_not_pass!!' : tile
  })
  const cannotJump = specials.indexOf('jumpover') === -1

  if (cannotJump) {
    const start = removedPlaced.indexOf('you_shall_not_pass!!')

    // get rid of blocked tiles
    start !== -1 && removedPlaced.fill(undefined, start)
  }

  return diet(removedPlaced)
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
function incSpecialDirection ({ piece, direction, specials, key, position, records }) {
  let nextDirection = direction.slice(0)
  let i = specials.length

  while (i--) {
    const specialName = specials[i]
    const specialMove = routeSpecials({
      special: specialName,
      piece,
      direction,
      key,
      position,
      records
    })

    if (specialMove) {
      nextDirection = specialMove
    }
  }

  return nextDirection
}

/**
 * Transform axisList to tiles
 * @param  {Object} args
 * @param  {Array}  args.axisList
 * @param  {string} args.side
 * @param  {string} args.position
 * @return {Array}
 * @access private
 */
function transformTiles ({ axisList, side, position }) {
  const availTiles = axisList.map(axis => fillAvailTilesOnly({ axis, side, position }))

  return diet(availTiles)
}

export default Chess
