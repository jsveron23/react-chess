import * as Utils from '@utils'
import * as Helpers from './helpers'
import testScenario, { getTargetInfo } from './simulate'
import { RANKS, FILES } from './constants'

/**
 * Chess engine
 * TODO side alias => alias
 */
class Chess {
  static getSide = Helpers.getSide
  static getEnemy = Helpers.getEnemy
  static getAlias = Helpers.getAlias
  static detectLastTurn = Helpers.detectLastTurn
  static parseNotation = Helpers.parseNotation
  static findNotation = Helpers.findNotation
  static findNotations = Helpers.findNotations
  static getMove = Helpers.getMove

  /**
   * Get movable tiles
   */
  static getMovable (notations, records = []) {
    return (piece, position, side) => (defaults, specials = []) => Utils.compose(
      Utils.diet,
      Utils.deepFlatten,
      excludeBlocked(notations, side)(specials),
      includeSpecial(records, side)(piece, position)(specials),
      getMovableData(position, side)
    )(defaults)
  }

  static isCheckMate () {

  }

  /**
   * Get avoidance tiles (after 'check' from enemy)
   * TODO
   * - loop every pieces tiles for chemate later, reduce it! (isCheckMate)
   * - check checkmate function (loop once when select), no noop here
   */
  static getBlocks (fns) {
    const {
      getMovement,
      getMovable
    } = fns
    const simulate = Chess.simulate(fns)
    let availBlocks4Selected

    /**
     * Get movable by notation
     * @param  {string} parsedNotation
     * @return {Object}
     */
    const _getMovableByNotation = (parsedNotation) => {
      const {
        position,
        piece,
        side
      } = parsedNotation
      const {
        defaults,
        specials
      } = getMovement(piece, false)

      return {
        movable: getMovable(piece, position, side)(defaults, specials),
        piece,
        position,
        side
      }
    }

    return (notations, turn) => (piece, position, side) => (checker) => {
      const alias = Helpers.getAlias(turn)
      const simStream = Utils.stream(simulate(turn))
      const kingSight = simStream.reduce((acc, kingSimulate) => kingSimulate({
        targetPiece: 'K',
        pretendPiece: 'Q',
        action: 'GET_SIGHT',
        initialValue: []
      }), [])

      /**
       * Get only available tile to block King
       * @param  {Object} parsed
       * @return {Array}
       */
      const _getBlocks = (parsed) => {
        const {
          movable: parsedMovable,
          piece: parsedPiece,
          position: parsedPosition,
          side: parsedSide
        } = parsed
        const isSelectedPiece = (
          parsedPiece === piece &&
          parsedPosition === position &&
          parsedSide === side
        )
        let filteredMovable

        if (parsedPiece === 'K') {
          const {
            movable: checkerSight
          } = _getMovableByNotation(Helpers.parseNotation(checker))

          filteredMovable = parsedMovable.filter((checkTile) => checkerSight.indexOf(checkTile) === -1)
        } else {
          filteredMovable = Utils.intersection(kingSight)(parsedMovable)
        }

        if (isSelectedPiece) {
          availBlocks4Selected = filteredMovable
        }
      }

      const _getBrothers = (notation) => notation.substr(0, 1) === alias

      notations
        .filter(_getBrothers)
        .map(Helpers.parseNotation)
        .map(_getMovableByNotation)
        .forEach(_getBlocks)

      return availBlocks4Selected
    }
  }

  /**
   * Simulate
   */
  static simulate (fns) {
    const { getMovement } = fns
    const [getTarget, applyScenarioOptions] = Utils.pass(
      getTargetInfo,
      testScenario
    )(fns)

    /**
     * Get target infomation
     */
    const _getTarget = (turn) => (targetPiece) => (pretendPiece) => Utils.compose(
      getTarget(turn, targetPiece, pretendPiece),
      getMovement
    )(pretendPiece || targetPiece)

    return (turn, piece = '') => (config) => {
      const {
        targetPiece,
        pretendPiece, // optional
        initialValue,
        action
      } = config
      const target = _getTarget(turn)(targetPiece)(pretendPiece)
      const { targetSight } = target

      // create scenarios callback
      const testOptions = { turn, piece, target, action }
      const applyScenario = applyScenarioOptions(testOptions)

      return targetSight.reduce(applyScenario, initialValue)
    }
  }

  /**
   * Save records data
   */
  static saveRecords (notations, records) {
    const passArg = Utils.pass(Utils.getLastItem, Utils.push)
    const [lastItem, push] = passArg(records)
    const transform = Helpers.transformMove(notations)
    const isCompletedRec = Helpers.isCompletedRecord(lastItem)
    const isNew = Utils.isEmpty(lastItem) || isCompletedRec // new or next record

    return (ts = +new Date()) => (nextNotations) => {
      const move = transform(nextNotations)
      const log = { move, notations, ts }
      const data = isNew
        ? { white: log }
        : { ...lastItem, black: log }

      return push(data, isNew)
    }
  }

  /**
   * Undo records data (by turn)
   */
  static undoRecord (records) {
    if (Utils.isEmpty(records)) {
      return () => ({})
    }

    const excludedLastItem = records.slice(0, -1)
    const lastItem = Utils.getLastItem(records)
    const isWhite = Helpers.detectLastTurn(lastItem) === 'white'
    const { white, black } = lastItem
    const log = isWhite ? white : black
    const { notations, move } = Helpers.parseLog(log)
    const revertNotations = Helpers.revertNotations(notations)
    const revertedNotations = Utils.compose(
      Utils.applyExtraArgs(revertNotations),
      Helpers.parseMove
    )(move)
    const revertedRecords = isWhite
      ? excludedLastItem
      : Utils.replaceLast(records)({ white })

    return () => ({ revertedRecords, revertedNotations })
  }

  /**
   * Return next notations
   */
  static getNextNotations (currPosition, nextPosition) {
    const procParse = Utils.compose(
      Utils.applyExtraArgs(Helpers.parsePosition),
      Helpers.parseNotation
    )

    /**
     * Converts notations to axis number for animations
     * @description
     * # b1 to h3
     * => [h(8) - b(2) = 6, 3 - 1 = 2]
     * => ([6, 2]) x pixel
     * => [300, 100]
     * => transform: translate(300px, 100px)
     * TODO calculate pixelSize automatically
     */
    const convertAxis = (currNotation) => (nextNotation) => (pixelSize = 50) => {
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

    return (setAxis) => (notations) => notations.reduce((nextNotations, notation) => {
      if (notation.search(currPosition) > -1) {
        const { side, piece } = Helpers.parseNotation(notation)
        const nextNotation = `${Helpers.getAlias(side)}${piece}${nextPosition}`
        const getAxis = convertAxis(notation)(nextNotation)

        /** @see @actions/general.js */
        setAxis({
          axis: getAxis(/* pixelSize */),
          notation: nextNotation // for comparing
        })

        return [...nextNotations, nextNotation]
      }

      return [...nextNotations, notation]
    }, [])
  }

  /**
   * Promotion
   */
  static promotion (notations) {
    return (records) => promotion(notations, records)
  }
}

/**
 * Get movable data from movement
 */
function getMovableData (position, turn) {
  const { file, rank } = Helpers.parsePosition(position)
  const fileIdx = Helpers.getFileIdx(file)

  /**
   * Transform axisList to tiles
   */
  const _transformTiles = (axisList) => axisList.reduce((list, axis) => {
    const [x, y] = axis

    // X: 1(a) + 1 = 2(b)
    const nextX = x + fileIdx

    // Y: upside down
    const nextY = turn === 'white'
      ? y + parseInt(rank, 10)
      : parseInt(rank, 10) - y

    const fileChar = Helpers.getFile(nextX) // it removes outside of board
    const isInside = (nextX > 0 && nextY > 0 && nextY < 9 && !!fileChar)

    return isInside ? [...list, `${fileChar}${nextY}`] : list
  }, [])

  return (defaults) =>
    Object.keys(defaults).map((mvName) => defaults[mvName].map(_transformTiles))
}

/**
 * Add special move to movable data
 */
function includeSpecial (records, turn) {
  const lastItem = Utils.getLastItem(records)

  return (piece, position) => (specials) => {
    /**
     * Control special moves of Pawn
     */
    const _controlPawnSpecials = (m, mvName) => {
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

    return (movable) => {
      if (piece === 'P') {
        return movable.map((m) => specials.reduce(_controlPawnSpecials, m))
      } else if (piece === 'K') {
        // TODO castling
      }

      return movable
    }
  }
}

/**
 * Filter blocked path to movable data (include enemy)
 */
function excludeBlocked (notations, turn) {
  const [checkPlace, findNotation] = Utils.pass(
    Helpers.isThere,
    Helpers.findNotation
  )(notations)

  return (specials) => {
    const cannotJump = specials.indexOf('jumpover') === -1

    return (movable) => movable.map((m) => {
      return m.map((tiles) => {
        let isBlocked = false
        let enemyTile = ''

        /**
         * Include only availiable tiles
         */
        const _includeAvailable = (nonBlocked, tile) => {
          if (Utils.isEmpty(enemyTile)) {
            const { side, position } = Utils.compose(
              Helpers.parseNotation,
              findNotation
            )(tile)

            // 1 enemy per direction
            const isEnemy = Helpers.getEnemy(turn) === side
            const isEnemyExist = (
              !isBlocked && isEnemy &&
              Utils.isEmpty(enemyTile) && Utils.isExist(side)
            )

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
        }

        return tiles
          .reduce(_includeAvailable, [])
          .concat(enemyTile) // include enemy tile
      })
    })
  }
}

/**
 * Promotion
 */
function promotion (notations, records) {
  const lastItem = Utils.getLastItem(records)
  const lastTurn = Helpers.detectLastTurn(lastItem)
  const move = Helpers.getMove(lastItem)(lastTurn)
  const { after } = Helpers.parseMove(move)
  const [x, y] = after.substr(-2, 2)
  const alias = Helpers.getAlias(lastTurn)
  const isEdge = /1|8/.test(y)

  if (isEdge) {
    const from = `${alias}P${x}${y}`
    const to = `${alias}Q${x}${y}`

    return Helpers.updateNotations(notations)(from, to)
  }
}

/**
 * Pawn moves 2 step forward
 */
function doubleStep (turn) {
  const applyOneMoreStep = Helpers.increaseRank(turn)

  return (m) => {
    const [tiles] = m
    const [tile] = tiles
    const oneMoreStep = applyOneMoreStep(tile)
    const mergedStep = Utils.push(tiles)(oneMoreStep)

    return [mergedStep]
  }
}

/**
 * Pawn moves diagonal and attack
 * TODO
 * - remove after
 * - it won't work sometimes
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
