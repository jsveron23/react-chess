import Specials from './specials'
import * as Utils from '@utils'
import Notations from './notations'
import Archives from './archives'

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
  static parseNotation = Notations.parse
  static findNotation = Notations.find
  static updateNotation = Notations.update
  static records = Archives.save
  static undo = Archives.revert

  /**
   * Get enemy
   * @return {Object}
   */
  static getEnemy ({
    side = ''
  }) {
    const oppositeSide = {
      w: 'black',
      b: 'white',
      white: 'black',
      black: 'white'
    }

    return oppositeSide[side]
  }

  /**
   * Transform piece
   * @return {Array}
   */
  static transformTo ({
    notations = [],
    records = [],
    to = ''
  }) {
    const lastItem = Utils.getLastItem({ items: records, shouldStrip: true })
    const { white, black } = lastItem
    const hasBlackRecord = Utils.isExist(black)
    const move = Archives.getMove({
      record: lastItem,
      side: hasBlackRecord ? 'black' : 'white'
    })
    const [piece, x, y] = move.join('').substr(-3, 3)
    const pendingArgs = {
      notations: [...notations],
      willTransformTo: 'Q',
      x,
      y
    }
    let promotedNotations = [...notations]

    if (Utils.isExist(black) && piece === 'P' && +y === 1) {
      promotedNotations = Specials.promotion({
        ...pendingArgs,
        side: 'b'
      })
    } else if (Utils.isExist(white) && piece === 'P' && +y === 8) {
      promotedNotations = Specials.promotion({
        ...pendingArgs,
        side: 'w'
      })
    }

    return promotedNotations
  }

  /**
   * Detect movable path but it does not check blocking path
   * @return {Array}
   */
  static detectMovablePath ({
    movement = {},
    specials = {},
    records = [],
    piece = '',
    position = '',
    side = ''
  }) {
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
      const includedSpecialDirection = Specials.incSpecialDirection({ piece, direction, key, specials, position, records })

      if (Utils.isExist(includedSpecialDirection)) {
        const transformedDirection = includedSpecialDirection.map(axisList => transformTiles({ axisList, side, position }))

        return transformedDirection.filter(tiles => (tiles.length !== 0))
      }
    })

    return Utils.diet(movable)
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
   * @param  {String} piece alias or fullname
   * @return {String}
   */
  static getPieceName (piece) {
    const initial = {
      P: 'Pawn',
      R: 'Rook',
      N: 'Knight',
      B: 'Bishop',
      Q: 'Queen',
      K: 'King'
    }

    return initial[piece] || piece
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
    const { position: prevPosition } = Notations.parse({ notation: prev })
    const { position: nextPosition } = Notations.parse({ notation: next })
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
  return !!Notations.find({ notations, position })
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

  return Utils.diet(removedPlaced)
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

  return Utils.diet(availTiles)
}

export default Chess
