import { isEmpty, isExist, diet, push, getLastItem } from '@utils'
import Specials from './specials'
import Notations from './notations'
import Records from './records'

// TODO
// implement!!
// - isBlocked({ notations, direction, position })
// - removeNotation({ ?? })

/**
 * Piece initial
 * @type {Object}
 */
const INITIAL = {
  P: 'Pawn',
  R: 'Rook',
  N: 'Knight',
  B: 'Bishop',
  Q: 'Queen',
  K: 'King'
}

/**
 * Chess piece color
 * @type {Object}
 */
const SIDE = {
  w: 'white',
  b: 'black',
  white: 'white',
  black: 'black'
}

/**
 * Enemy piece color
 * @type {Object}
 */
const ENEMY = {
  w: 'black',
  b: 'white',
  white: 'black',
  black: 'white'
}

/**
 * Ranks
 * @type {Array}
 * @readonly
 */
const RANKS = Object.freeze(['8', '7', '6', '5', '4', '3', '2', '1'])

/**
 * Files
 * @type {Array}
 * @readonly
 */
const FILES = Object.freeze(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])

/**
 * Chess engine
 * @namespace Chess
 */
const Chess = {
  RANKS,
  FILES,
  parseNotation: Notations.parse,
  findNotation: Notations.find,
  updateNotation: Notations.update,
  transformNextNotations: Notations.getNext,
  records: Records.save,
  undo: Records.revert,

  /**
   * Get full name of Chess piece
   * @param  {String}  alias
   * @param  {Object?} initial
   * @return {String}
   */
  getPieceName: (alias, initial = INITIAL) => initial[alias] || alias,

  /**
   * Get file char from index number (-1)
   * @param  {Number} idx
   * @param  {Array?} files
   * @return {String}
   */
  getFile: (idx, files = FILES) => files.join('').charAt(idx - 1),

  /**
   * Get index number from file char (+1)
   * @param  {String} char
   * @param  {Array?} files
   * @return {Number}
   */
  getFileIdx: (char, files = FILES) => (files.join('').indexOf(char) + 1),

  /**
   * Get side
   * @param  {String}  alias
   * @param  {Object?} side
   * @return {String}
   */
  getSide: (alias, side = SIDE) => side[alias],

  /**
   * Get enemy
   * @param  {String}  side
   * @param  {Object?} enemy
   * @return {String}
   */
  getEnemy: (side, enemy = ENEMY) => enemy[side],

  /**
   * Dispatch
   * @param  {action}   action
   * @return {Function}
   */
  dispatch (action) {
    const { type, payload } = action

    // reducer
    switch (type) {
      case 'PROMOTION': {
        const { notations, records } = payload
        const [lastItem] = getLastItem(records)
        const { white, black } = lastItem
        const [x, y] = Records.getMove({
          record: lastItem,
          side: isExist(black) ? 'black' : 'white'
        }).join('').substr(-2, 2) // ['???? ??(??)']
        const data = { notations: [...notations], x, y }
        let transformedNotations = [...notations]

        // can promotion
        if (+y === 1 && isExist(black)) {
          transformedNotations = Specials.promotion({ ...data, side: 'b' })
        } else if (+y === 8 && isExist(white)) {
          transformedNotations = Specials.promotion({ ...data, side: 'w' })
        }

        return transformedNotations
      }

      default: {
        const { notations } = payload

        return [...notations]
      }
    }
  },

  /**
   * Detect movable path but it does not check blocking path
   * @return {Function}
   */
  getRawMovableData: ({ piece, position, side, records }) => ({ defaults, specials }) => {
    // add all direction for adding special moves while process
    // -> not add jump-over move (Knight)
    // e.g. Pawn moves straightly only but it can move diagonally when en-passant
    const extendMovement = Object.assign({}, {
      vertical: [],
      horizontal: [],
      diagonal: []
    }, defaults)

    // transform standard movement to movable
    // - movement => group of direction that included group of axis (calculate)
    // - movable => group of tiles (readability, display)
    const movable = Object.keys(extendMovement).map(key => {
      // group of axis
      const direction = extendMovement[key]

      // added special direction
      const specialDirection = Specials.includeSpecialDirection({ piece, direction, key, specials, position, records })

      if (isExist(specialDirection)) {
        return specialDirection
          .map(axisList => _transformTiles({ axisList, side, position }))
          .filter(tiles => (tiles.length !== 0))
      }
    })

    return diet(movable)
  },

  /**
   * Filter blocked path
   * @return {Function}
   */
  rejectBlockedMovableData: ({ notations, turn, specials }) => (movable) => {
    return movable.map(m => { // tile list of direction
      return m.map(tiles => {
        const enemyTiles = _includeEnemyPiece({ notations, tiles, turn })
        const nonBlockedTiles = _removeBlocking({ specials, notations, tiles })
        const [firstTile] = nonBlockedTiles
        let [lastTile] = nonBlockedTiles.slice(-1)
        let shouldMerge = false

        lastTile = isEmpty(lastTile) ? firstTile : lastTile

        if (isExist(firstTile) && firstTile !== lastTile && isExist(enemyTiles)) {
          const firstFile = firstTile.substr(-1)
          const lastFile = lastTile.substr(-1)
          const [fistEnemyTile] = enemyTiles
          const enemyFile = fistEnemyTile.substr(-1)

          if (isExist(enemyFile) && +firstFile > +lastFile) {
            shouldMerge = +enemyFile > +lastFile
          } else if (isExist(enemyFile) && +firstFile < +lastFile) {
            shouldMerge = +enemyFile < +lastFile
          }
        }

        const mergedPath = shouldMerge ? nonBlockedTiles : push(nonBlockedTiles, enemyTiles)

        console.log(nonBlockedTiles, enemyTiles)

        return mergedPath
      })
    })
  },

  /**
   * Converts notations to axis number for animations
   * @param  {String} prevNotation
   * @param  {String} nextNotation
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
  convertAxis (prevNotation, nextNotation, pixelSize = 50) {
    const { position: prevPosition } = Notations.parse(prevNotation)
    const { position: nextPosition } = Notations.parse(nextNotation)
    const [prevFile, prevRank] = prevPosition.split('')
    const [nextFile, nextRank] = nextPosition.split('')

    // pixelSize means starting position of animation
    // the animation looks like moving a component
    // but it just re-render(re-created, state changed) and animated from starting position
    // pretend moving component
    return {
      x: (Chess.getFileIdx(nextFile) - Chess.getFileIdx(prevFile)) * pixelSize,
      y: (+nextRank - +prevRank) * pixelSize
    }
  }
}

/**
 * Include enemy piece for each direction
 * @return {Array}
 */
function _includeEnemyPiece ({
  notations = [],
  tiles = [],
  turn = ''
}) {
  // TODO
  // - refactoring!
  // - reduce loop
  let isEnemy = false
  let isTargeted = false
  const contactableEnemyPieces = tiles.map(tile => {
    const isPlaced = _isPlaced({ notations, position: tile })

    if (!isEnemy && !isTargeted) {
      const findNotation = Chess.findNotation(notations)
      const found = findNotation(tile)

      console.log('found!!', found)

      if (isExist(found)) {
        const side = found.substr(0, 1)
        const tileSide = Chess.getSide(side)
        const myEnemy = Chess.getEnemy(turn)

        // TODO common argument name
        if (tileSide === myEnemy) {
          isEnemy = true
        } else {
          // pretent target exist
          // to ignore target after blocked
          isTargeted = true
        }
      }
    }

    if (isPlaced && isEnemy && !isTargeted) {
      isTargeted = true

      return tile
    }
  })

  return diet(contactableEnemyPieces)
}

/**
 * Is any piece there?
 * @return {Boolean}
 */
function _isPlaced ({
  notations = [],
  position = ''
}) {
  const findNotation = Notations.find(notations)

  return !!findNotation(position)
}

/**
 * Includes only available tiles
 * @return {String}
 */
function _fillAvailTilesOnly ({
  axis = [],
  side = '',
  position = ''
}) {
  const [x, y] = axis
  const [file, rank] = position.split('')
  const fileIdx = Chess.getFileIdx(file)

  // X: 1(a) + 1 = 2(b)
  const nextX = x + fileIdx

  // Y: upside down
  const nextY = side === 'white'
    ? y + parseInt(rank, 10)
    : parseInt(rank, 10) - y

  const fileChar = Chess.getFile(nextX)
  const isAvailMove = (nextX > 0 && nextY > 0 && !!fileChar)

  return isAvailMove ? `${fileChar}${nextY}` : ''
}

/**
 * Detect blocked direction
 * @return {Array}
 */
function _removeBlocking ({
  specials = [],
  notations = [],
  tiles = []
}) {
  const removedPlaced = tiles.map((tile, idx) => {
    const isPlaced = _isPlaced({ notations, position: tile })

    return isPlaced ? 'you_shall_not_pass!!' : tile
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
 * Transform axisList to tiles
 * @return {Array}
 */
function _transformTiles ({
  axisList = [],
  side = '',
  position = ''
}) {
  const availTiles = axisList.map(axis => _fillAvailTilesOnly({ axis, side, position }))

  return diet(availTiles)
}

export default Chess
