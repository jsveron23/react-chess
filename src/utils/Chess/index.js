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
  static updateNotations = Helpers.updateNotations
  static getMove = Helpers.getMove

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
      const payload = { move, notations, ts }
      const data = isNew
        ? { white: payload }
        : { ...lastItem, black: payload }

      return Utils.push(records, data, isNew)
    }
  }

  /**
   * Undo
   * @return {Function}
   * TODO fix cannot move once after undo
   */
  static undo (records) {
    return () => {
      if (Utils.isEmpty(records)) {
        return {}
      }

      const [lastItem] = Utils.getLastItem(records)
      const { white, black } = lastItem
      const isWhite = Helpers.detectLastTurn(lastItem) === 'white'
      const log = isWhite ? white : black
      const { notations, move } = Helpers.parseLog(log)
      const { before, after } = Helpers.parseMove(move)
      const excludedLastItem = records.slice(0, -1)
      const revertedNotations = Helpers.revertNotations(before, after)(notations)

      return {
        revertedRecords: isWhite ? excludedLastItem : Utils.replaceLast(records, { white }),
        revertedNotations
      }
    }
  }

  /**
   * Return next notations
   * @return {Function}
   */
  static getNextNotations (currPosition, nextPosition) {
    return (setAxis) => (notations) => notations.map((n) => {
      if (n.search(currPosition) > -1) {
        const getAxis = Chess.convertAxis(n)(/* pixelSize */)
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
  static convertAxis (currNotation) {
    const procParse = Utils.compose(Helpers.parsePosition, Helpers.parseNotation)
    const {
      file: prevFile,
      rank: prevRank
    } = procParse(currNotation)

    return (pixelSize = 50) => (nextNotation) => {
      const {
        file: nextFile,
        rank: nextRank
      } = procParse(nextNotation)
      const x = (Helpers.getFileIdx(nextFile) - Helpers.getFileIdx(prevFile)) * pixelSize
      const y = (parseInt(nextRank, 10) - parseInt(prevRank, 10)) * pixelSize

      return { x, y }
    }
  }

  /**
   * Get movable data from transfromed movement
   * @return {Function}
   */
  static getMovableData (position, side) {
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

      const fileChar = Helpers.getFile(nextX) // it remove outside of board
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
  static includeSpecial (records) {
    const [lastItem] = Utils.getLastItem(records)
    const turn = Helpers.detectTurn(lastItem)

    return (piece, position, specials) => (movable) => {
      /**
       * @param  {Array}  m
       * @param  {string} mvName
       * @return {Array}
       */
      const pawnReducer = (m, mvName) => {
        switch (mvName) {
          case 'doubleStep': {
            const isFirstStep = /^.(2|7)$/.test(position)

            if (!isFirstStep) {
              return m
            }

            const apply = doubleStep(turn)

            return apply(m)
          }

          case 'enPassant': {
            if (Utils.isEmpty(lastItem)) {
              return m
            }

            const apply = enPassant(turn, position, lastItem)

            return apply(m)
          }

          default: {
            return m
          }
        }
      }

      if (piece === 'P') {
        return movable.map((m) => specials.reduce(pawnReducer, m))
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
  static excludeBlocked (notations) {
    const checkPlaced = Helpers.isThere(notations)
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
              const { side, position } = Helpers.parseNotation(found)

              // 1 enemy per direction
              const isEnemyExist = (
                !isBlocked &&
                Utils.isEmpty(enemyTile) && Utils.isExist(side) &&
                Helpers.getEnemy(turn) === Helpers.getSide(side)
              )

              if (isEnemyExist) {
                enemyTile = position
              }
            }

            const isPlaced = checkPlaced(tile)
            const canJump = !cannotJump

            // everything except Knight
            const exceptKnight = isPlaced && !isBlocked && cannotJump

            // only for Knight
            const only4Knight = isPlaced && canJump

            // after blocked, remove all tiles
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
 */
function enPassant (turn, position, lastItem) {
  const isWhiteTurn = turn === 'white'
  const enemyMove = Utils.compose(
    Helpers.getMove(lastItem),
    Helpers.getEnemy,
    Helpers.detectTurn)(lastItem)

  if (Utils.isEmpty(enemyMove)) {
    return (movable) => movable
  }

  // get myself
  const { file: myFile, rank: myRank } = Helpers.parsePosition(position)
  const myFileIdx = Helpers.getFileIdx(myFile)

  // get enemy
  const enemyPosition = `${enemyMove.substr(-2, 1)}${enemyMove.substr(-1)}`
  const { file: enemyFile, rank: enemyRank } = Helpers.parsePosition(enemyPosition)
  const enemyFileIdx = Helpers.getFileIdx(enemyFile)

  // check
  const howManyLastStep = Helpers.getHowManyStepVertical(enemyMove)
  const isSibling = Math.abs(myFileIdx - enemyFileIdx) === 1
  const isAdjustedLine = +myRank === +enemyRank

  return (m) => {
    // valid
    if ((howManyLastStep === 2) && isAdjustedLine && isSibling) {
      const nextRank = isWhiteTurn
        ? parseInt(enemyRank, 10) + 1
        : parseInt(enemyRank, 10) - 1
      const diagonal = `${enemyFile}${nextRank}`

      return [...m, [diagonal]]
    }

    return m
  }
}

export default Chess
export { RANKS, FILES }
