import * as Utils from '@utils'
import Specials from './specials'
import Notations from './notations'
import Archives from './archives'

// TODO
// implement!!
// - isBlocked({ notations, direction, position })
// - removeNotation({ ?? })

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
  getFile: _getFile,
  getFileIdx: _getFileIdx,
  parseNotation: Notations.parse,
  findNotation: Notations.find,
  updateNotation: Notations.update,
  records: Archives.save,
  undo: Archives.revert,

  /**
   * Get side
   * @return {String}
   */
  getSide ({
    propName = ''
  }) {
    const side = {
      w: 'white',
      b: 'black'
    }

    return side[propName]
  },

  /**
   * Get enemy
   * @return {String}
   */
  getEnemy ({
    side = ''
  }) {
    const oppositeSide = {
      w: 'black',
      b: 'white',
      white: 'black',
      black: 'white'
    }

    return oppositeSide[side]
  },

  /**
   * Transform piece
   * @return {Array}
   */
  transformTo ({
    notations = [],
    records = [],
    position = '',
    action = ''
  }) {
    const nextNotations = [...notations]
    const lastItem = Utils.getLastItem(records, true)
    const { white, black } = lastItem
    const hasBlackLog = Utils.isExist(black)
    const move = Archives.getMove({
      record: lastItem,
      side: hasBlackLog ? 'black' : 'white'
    })
    const [x, y] = move.join('').substr(-2, 2) // ['???? ??(??)']
    const payload = { notations: nextNotations, x, y }
    let transformedNotations = nextNotations

    switch (action) {
      case 'promotion': {
        if (+y === 1 && Utils.isExist(black)) {
          transformedNotations = Specials.promotion({ ...payload, side: 'b' })
        } else if (+y === 8 && Utils.isExist(white)) {
          transformedNotations = Specials.promotion({ ...payload, side: 'w' })
        }

        return transformedNotations
      }

      case 'remove': {
        // TODO implement
        return transformedNotations
      }

      default: {
        return nextNotations
      }
    }
  },

  /**
   * Detect movable path but it does not check blocking path
   * @return {Array}
   */
  detectMovablePath ({
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
  },

  /**
   * Filter blocked path
   * @return {Array}
   */
  excludeBlockedPath ({
    notations = [],
    movable = [],
    specials = [],
    turn = ''
  }) {
    return movable.map(m => { // tile list of direction
      return m.map(tiles => {
        const enemyTiles = _includeEnemyPiece({ notations, tiles, turn })
        const nonBlockedTiles = _removeBlocking({ specials, notations, tiles })
        const [firstTile] = nonBlockedTiles
        let [lastTile] = nonBlockedTiles.slice(-1)
        let shouldMerge = false

        lastTile = Utils.isEmpty(lastTile) ? firstTile : lastTile

        if (Utils.isExist(firstTile) && firstTile !== lastTile && Utils.isExist(enemyTiles)) {
          const firstFile = firstTile.substr(-1)
          const lastFile = lastTile.substr(-1)
          const [fistEnemyTile] = enemyTiles
          const enemyFile = fistEnemyTile.substr(-1)

          if (Utils.isExist(enemyFile) && +firstFile > +lastFile) {
            shouldMerge = +enemyFile > +lastFile
          } else if (Utils.isExist(enemyFile) && +firstFile < +lastFile) {
            shouldMerge = +enemyFile < +lastFile
          }
        }

        const mergedPath = shouldMerge ? nonBlockedTiles : Utils.push(nonBlockedTiles, enemyTiles)

        console.log(nonBlockedTiles, enemyTiles)

        return mergedPath
      })
    })
  },

  /**
   * Get full name of Chess piece
   * @return {String}
   */
  getPieceName ({
    piece = ''
  }) {
    const initial = {
      P: 'Pawn',
      R: 'Rook',
      N: 'Knight',
      B: 'Bishop',
      Q: 'Queen',
      K: 'King'
    }

    return initial[piece] || piece
  },

  /**
   * Converts notations to axis number for animations
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
  convertAxis ({
    prev = '',
    next = '',
    pixelSize = 50
  }) {
    const { position: prevPosition } = Notations.parse({ notation: prev })
    const { position: nextPosition } = Notations.parse({ notation: next })
    const [prevFile, prevRank] = prevPosition.split('')
    const [nextFile, nextRank] = nextPosition.split('')

    // pixelSize means starting position of animation
    // the animation looks like moving a component
    // but it just re-render(re-created, state changed) and animated from starting position
    // pretend moving component
    return {
      x: (_getFileIdx({ char: nextFile }) - _getFileIdx({ char: prevFile })) * pixelSize,
      y: (parseInt(nextRank, 10) - parseInt(prevRank, 10)) * pixelSize
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
      const found = Chess.findNotation({ notations, position: tile })

      console.log('found!!', found)

      if (Utils.isExist(found)) {
        const side = found.substr(0, 1)
        const tileSide = Chess.getSide({ propName: side })
        const myEnemy = Chess.getEnemy({ side: turn })

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

  return Utils.diet(contactableEnemyPieces)
}

/**
 * Is any piece there?
 * @return {Boolean}
 */
function _isPlaced ({
  notations = [],
  position = ''
}) {
  return !!Notations.find({ notations, position })
}

/**
 * Get file char from index number (-1)
 * @return {String}
 */
function _getFile ({
  idx,
  files = FILES
}) {
  return files.join('').charAt(idx - 1)
}

/**
 * Get index number from file char (+1)
 * @return {Number}
 */
function _getFileIdx ({
  char = '',
  files = FILES
}) {
  return files.join('').indexOf(char) + 1
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
  const fileIdx = _getFileIdx({ char: file })

  // X: 1(a) + 1 = 2(b)
  const nextX = x + fileIdx

  // Y: upside down
  const nextY = side === 'w'
    ? y + parseInt(rank, 10)
    : parseInt(rank, 10) - y

  const fileChar = _getFile({ idx: nextX })
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

  return Utils.diet(removedPlaced)
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

  return Utils.diet(availTiles)
}

export default Chess
