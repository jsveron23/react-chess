import Specials from './specials'
import * as Utils from '@utils'
import Notations from './notations'
import Archives from './archives'

// TODO
// implement!!
// - isBlocked({ notations, direction, position })
// - removeNotation({ ?? })

/**
 * Ranks
 * @type {Array}
 */
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1']

/**
 * Files
 * @type {Array}
 */
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

/**
 * Chess engine
 */
class Chess {
  static RANKS = RANKS
  static FILES = FILES
  static getFile = _getFile
  static getFileIdx = _getFileIdx
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
    action = '' // TODO implement later, ['remove', 'promotion']
  }) {
    const nextNotations = [...notations]
    const lastItem = Utils.getLastItem(records, true)
    const { white, black } = lastItem
    const hasBlackLog = Utils.isExist(black)
    const move = Archives.getMove({
      record: lastItem,
      side: hasBlackLog ? 'black' : 'white'
    })
    const [piece, x, y] = move.join('').substr(-3, 3) // ['???? ?(???)']
    const payload = { notations: nextNotations, x, y }
    let transformedNotations = nextNotations

    if (piece === 'P') {
      if (Utils.isExist(black) && +y === 1) {
        transformedNotations = Specials.promotion({
          ...payload,
          side: 'b'
        })
      } else if (Utils.isExist(white) && +y === 8) {
        transformedNotations = Specials.promotion({
          ...payload,
          side: 'w'
        })
      }
    }

    return transformedNotations
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
      const specialDirection = Specials.includSpecialDirection({ piece, direction, key, specials, position, records })

      if (Utils.isExist(specialDirection)) {
        const transformedDirection = specialDirection.map(axisList => _transformTiles({ axisList, side, position }))

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
      return m.map(tiles => _removeBlocking({ specials, notations, tiles }))
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
      x: (_getFileIdx(nextFile) - _getFileIdx(prevFile)) * pixelSize,
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
function _isPlaced ({ notations, position }) {
  return !!Notations.find({ notations, position })
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
 * Includes only available tiles
 * @param  {Object}   args
 * @param  {Array}    args.axis
 * @param  {string}   args.side
 * @param  {string}   args.position
 * @return {String}
 */
function _fillAvailTilesOnly ({ axis, side, position }) {
  const [x, y] = axis

  // get file, rank from current position
  const [file, rank] = position.split('')

  // current X index number
  const fileIdx = _getFileIdx(file)

  // X: 1(a) + 1 = 2(b)
  const nextX = x + fileIdx

  // Y: upside down
  const nextY = side === 'w'
    ? y + parseInt(rank, 10)
    : parseInt(rank, 10) - y

  const fileChar = _getFile(nextX)

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
 */
function _removeBlocking ({ specials, notations, tiles }) {
  const removedPlaced = tiles.map(tile => {
    return _isPlaced({ notations, position: tile }) ? 'you_shall_not_pass!!' : tile
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
 */
function _transformTiles ({ axisList, side, position }) {
  const availTiles = axisList.map(axis => _fillAvailTilesOnly({ axis, side, position }))

  return Utils.diet(availTiles)
}

export default Chess
