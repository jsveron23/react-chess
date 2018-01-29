import * as Utils from '@utils'
import * as Helpers from './helpers'
import { RANKS, FILES } from './constants'

/**
 * Chess engine
 */
class Chess {
  static getSide = Helpers.getSide
  static getEnemy = Helpers.getEnemy
  static getAlias = Helpers.getAlias
  static detectLastTurn = Helpers.detectLastTurn
  static parseNotation = Helpers.parseNotation
  static findNotation = Helpers.findNotation
  static findNotations = Helpers.findNotations
  static updateNotations = Helpers.updateNotations
  static getMove = Helpers.getMove

  /**
   * Predict next movement by movable data
   * @return {Function}
   */
  static predictSight (notations) {
    const getMovable = Chess.getMovable(notations)

    return (piece, position, turn) => (defaults) => Utils.compose(
      Utils.deepFlatten,
      getMovable(piece, position, turn)
    )(defaults).filter(Utils.diet)
  }

  /**
   * Is check?
   * @return {boolean}
   */
  static isCheck (fns) {
    // TODO
    const { find, getSight, getPiece } = fns

    return (turn) => (kingPosition, kingSight) => kingSight.reduce((isAble2Check, tile) => {
      const found = find(tile)

      if (!isAble2Check && Utils.isExist(found)) {
        const { piece, position } = Helpers.parseNotation(found)

        // TODO
        const { movement } = getPiece(piece)
        const { defaults } = movement

        const enemy = Helpers.getEnemy(turn)
        const sight = getSight(piece, position, enemy)(defaults)
        const checker = sight.indexOf(kingPosition) > -1

        return !!checker
      }

      return isAble2Check
    }, false)
  }

  /**
   * Get complete movable data (composition)
   * @return {Function}
   */
  static getMovable (notations, records = []) {
    return (piece, position, side) => (defaults, specials = []) => Utils.compose(
      excludeBlocked(notations)(side, specials),
      includeSpecial(records)(piece, position, side, specials),
      getMovableData(position, side)
    )(defaults)
  }

  /**
   * Save records data
   * @return {Function}
   */
  static saveRecords (records, notations) {
    const transform = Helpers.transformMove(notations)
    const [lastItem] = Utils.getLastItem(records)
    const isCompletedRec = Helpers.isCompletedRecord(lastItem)
    const isNew = Utils.isEmpty(lastItem) || isCompletedRec // new or next record

    return (ts = +new Date()) => (nextNotations) => {
      const move = transform(nextNotations)
      const log = { move, notations, ts }
      const data = isNew
        ? { white: log }
        : { ...lastItem, black: log }

      return Utils.push(records, data, isNew)
    }
  }

  /**
   * Undo
   * @return {Function}
   * TODO fix cannot move piece once after undo
   */
  static undo (records) {
    if (Utils.isEmpty(records)) {
      return () => ({})
    }

    const excludedLastItem = records.slice(0, -1)

    return () => {
      const [lastItem] = Utils.getLastItem(records)
      const isWhite = Helpers.detectLastTurn(lastItem) === 'white'
      const { white, black } = lastItem
      const log = isWhite ? white : black
      const { notations, move } = Helpers.parseLog(log)
      const { before, after } = Helpers.parseMove(move)
      const revertedNotations = Helpers.revertNotations(before, after)(notations)
      const revertedRecords = isWhite
        ? excludedLastItem
        : Utils.replaceLast(records, { white })

      return { revertedRecords, revertedNotations }
    }
  }

  /**
   * Return next notations
   * @return {Function}
   */
  static getNextNotations (currPosition, nextPosition) {
    const procParse = Utils.compose(Helpers.parsePosition, Helpers.parseNotation)

    /**
     * Converts notations to axis number for animations
     * @return {Function}
     * @description
     * # b1 to h3
     * => [h(8) - b(2) = 6, 3 - 1 = 2]
     * => ([6, 2]) x pixel
     * => [300, 100]
     * => transform: translate(300px, 100px)
     * TODO calculate pixelSize automatically
     */
    const convertAxis = (pixelSize = 50) => (currNotation) => (nextNotation) => {
      const {
        file: prevFile,
        rank: prevRank
      } = procParse(currNotation)
      const {
        file: nextFile,
        rank: nextRank
      } = procParse(nextNotation)
      const x = (Helpers.getFileIdx(nextFile) - Helpers.getFileIdx(prevFile)) * pixelSize
      const y = (parseInt(nextRank, 10) - parseInt(prevRank, 10)) * pixelSize

      return { x, y }
    }

    return (setAxis) => (notations) => notations.map((n) => {
      if (n.search(currPosition) > -1) {
        const getAxis = convertAxis(/* pixelSize */)(n)
        const { side, piece } = Helpers.parseNotation(n)
        const nextNotation = `${side}${piece}${nextPosition}`

        /** @see @actions/general.js */
        setAxis({
          axis: getAxis(nextNotation),
          notation: nextNotation // for comparing
        })

        return nextNotation
      }

      return n
    })
  }

  /**
   * Promotion
   * @return {Function}
   */
  static promotion (notations) {
    return (records) => promotion(notations, records)
  }
}

/**
 * Get movable data from movement
 * @return {Function}
 */
function getMovableData (position, side) {
  const { file, rank } = Helpers.parsePosition(position)
  const fileIdx = Helpers.getFileIdx(file)

  /**
   * Transform axisList to tiles
   * @return {Array}
   */
  const transformTiles = (axisList) => axisList.reduce((list, axis) => {
    const [x, y] = axis

    // X: 1(a) + 1 = 2(b)
    const nextX = x + fileIdx

    // Y: upside down
    const nextY = side === 'white'
      ? y + parseInt(rank, 10)
      : parseInt(rank, 10) - y

    const fileChar = Helpers.getFile(nextX) // it removes outside of board
    const isInside = (nextX > 0 && nextY > 0 && nextY < 9 && !!fileChar)

    return isInside ? [...list, `${fileChar}${nextY}`] : list
  }, [])

  return (defaults) =>
    Object.keys(defaults).map((mvName) => defaults[mvName].map(transformTiles))
}

/**
 * Add special move to movable data
 * @return {Function}
 */
function includeSpecial (records) {
  const [lastItem] = Utils.getLastItem(records)

  /**
   * Control special move of Pawn
   * @return {Array}
   */
  const controlPawn = (position) => (turn) => (m, mvName) => {
    switch (mvName) {
      case 'doubleStep': {
        const isFirstStep = /^.(2|7)$/.test(position)

        if (!isFirstStep) {
          return m
        }

        return doubleStep(turn)(m)
      }

      case 'enPassant': {
        if (Utils.isEmpty(lastItem)) {
          return m
        }

        return enPassant(position, lastItem)(m)
      }

      default: {
        return m
      }
    }
  }

  return (piece, position, turn, specials) => (movable) => {
    if (piece === 'P') {
      const detectSpecial = controlPawn(position)(turn)

      return movable.map((m) => specials.reduce(detectSpecial, m))
    } else if (piece === 'K') {
      // TODO castling
    }

    return movable
  }
}

/**
 * Filter blocked path to movable data (include enemy)
 * @return {Function}
 */
function excludeBlocked (notations) {
  const checkPlace = Helpers.isThere(notations)
  const find = Helpers.findNotation(notations)

  return (turn, specials) => (movable) => movable.map((m) => {
    const cannotJump = specials.indexOf('jumpover') === -1

    return m.map((tiles) => {
      let isBlocked = false
      let enemyTile = ''

      return tiles
        .reduce((nonBlocked, tile) => {
          if (Utils.isEmpty(enemyTile)) {
            const found = find(tile)
            const { side, position } = Helpers.parseNotation(found) // piece

            // 1 enemy per direction
            const isEnemy = Helpers.getEnemy(turn) === Helpers.getSide(side)
            const isEnemyExist = (
              !isBlocked && isEnemy &&
              Utils.isEmpty(enemyTile) && Utils.isExist(side)
            )

            // TODO check 'check' after moving
            // if (!isBlocked && isEnemy && Utils.isExist(piece) && piece === 'K') {
            //   console.log('Check: ', side, piece, tile)
            // }

            if (isEnemyExist) {
              enemyTile = position
            }
          }

          const isPlaced = checkPlace(tile)
          const canJump = !cannotJump

          // everything except Knight
          const exceptKnight = isPlaced && !isBlocked && cannotJump

          // only for Knight
          const only4Knight = isPlaced && canJump

          // after blocked, remove leftover tiles (ignore)
          const afterBlocked = isBlocked

          if (exceptKnight || afterBlocked || only4Knight) {
            if (exceptKnight) {
              isBlocked = true
            }

            return nonBlocked
          }

          return [...nonBlocked, tile]
        }, [])
        .concat(enemyTile) // include enemy tile
    })
  })
}

/**
 * Promotion
 * @return {Array?}
 */
function promotion (notations, records) {
  const [lastItem] = Utils.getLastItem(records)
  const lastTurn = Helpers.detectLastTurn(lastItem)
  const move = Helpers.getMove(lastItem)(lastTurn)
  const { after } = Helpers.parseMove(move)
  const [x, y] = after.substr(-2, 2)
  const side = Helpers.getAlias(lastTurn)
  const isEdge = /1|8/.test(y)

  if (isEdge) {
    const from = `${side}P${x}${y}`
    const to = `${side}Q${x}${y}`
    const update = Helpers.updateNotations(from, to)
    const nextNotations = update(notations)

    return nextNotations
  }
}

/**
 * Pawn moves 2 steps forward
 * @return {Function}
 */
function doubleStep (turn) {
  const applyOneMoreStep = Helpers.increaseRank(turn)

  return (m) => {
    const [tiles] = m
    const [tile] = tiles
    const oneMoreStep = applyOneMoreStep(tile)
    const mergedStep = Utils.push(tiles, oneMoreStep)

    return [mergedStep]
  }
}

/**
 * Pawn moves diagonal and attack
 * @return {Function}
 * TODO remove after
 */
function enPassant (position, lastItem) {
  const enemyMove = Utils.compose(
    Helpers.getMove(lastItem),
    Helpers.getEnemy,
    Helpers.detectTurn
  )(lastItem)
  const isPawn = enemyMove.substr(1, 1) === 'P'

  if (Utils.isEmpty(enemyMove) || !isPawn) {
    return (m) => m
  }

  const turn = Helpers.detectTurn(lastItem)

  // get myself
  const { file: myFile, rank: myRank } = Helpers.parsePosition(position)
  const myFileIdx = Helpers.getFileIdx(myFile)

  // get enemy
  const enemyPosition = enemyMove.substr(-2)
  const { file: enemyFile, rank: enemyRank } = Helpers.parsePosition(enemyPosition)
  const enemyFileIdx = Helpers.getFileIdx(enemyFile)

  // check
  const howManyLastStep = Helpers.getHowManyStepVertical(enemyMove)
  const isDoubleStep = howManyLastStep === 2
  const isSibling = Math.abs(myFileIdx - enemyFileIdx) === 1
  const isAdjustedLine = parseInt(myRank, 10) === parseInt(enemyRank, 10)

  return (m) => {
    // valid
    if (isDoubleStep && isAdjustedLine && isSibling) {
      const diagonal = Helpers.increaseRank(turn)(enemyPosition)

      return [...m, [diagonal]]
    }

    return m
  }
}

export default Chess
export { RANKS, FILES }
