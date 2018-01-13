import { isEmpty, isExist, diet, push } from '@utils'
import { INITIAL, SIDE, ENEMY, RANKS, FILES } from './constants'
import Specials from './specials'
import Notations from './notations'
import Records from './records'

// TODO
// implement!!
// - isBlocked({ notations, direction, position })
// - removeNotation({ ?? })

export { INITIAL, SIDE, ENEMY, RANKS, FILES }

/**
 * Chess engine
 * @namespace Chess
 */
const Chess = {
  parseNotation: Notations.parse,
  findNotation: Notations.find,
  updateNotation: Notations.update,
  transformNextNotations: Notations.getNext,
  records: Records.save,
  undo: Records.revert,
  getMove: Records.getMove,
  promotion: Specials.promotion,

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
  getFileIdx: (char, files = FILES) => files.join('').indexOf(char) + 1,

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

        const mergedPath = shouldMerge
          ? nonBlockedTiles
          : push(nonBlockedTiles, enemyTiles)

        console.log(nonBlockedTiles, enemyTiles)

        return mergedPath
      })
    })
  },

  /**
   * Converts notations to axis number for animations
   * @return {Return}
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
  convertAxis: (currNotation, pixelSize = 50) => (nextNotation) => {
    const { position: currPosition } = Notations.parse(currNotation)
    const { position: nextPosition } = Notations.parse(nextNotation)
    const [prevFile, prevRank] = currPosition.split('')
    const [nextFile, nextRank] = nextPosition.split('')
    const getIdx = Chess.getFileIdx

    // pixelSize means starting position of animation
    // the animation looks like moving a component
    // but it just re-render(re-created, state changed) and animated from starting position
    // pretend moving component
    return {
      x: (getIdx(nextFile) - getIdx(prevFile)) * pixelSize,
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
