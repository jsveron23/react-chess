import * as Utils from '@utils'
import { RANKS, FILES } from './constants'
import * as Helpers from './helpers'
import * as Core from './core'
import testScenario, { getTargetInfo } from './simulate'

const Chess = {
  // get blockable tiles to protect King
  // TODO
  // - capturable checker
  getBlocks (options = {}) {
    const {
      isKing = false,
      fns
    } = options
    let _getCommonSight_

    return (notations) => (records) => {
      const _getSightBy_ = Core.getSightBy(notations, records)

      if (!isKing) {
        const getCommonSights = Core.getCommonSights(notations, records)
        const checkedSight = fns.getAttackingRoute(getCommonSights)

        _getCommonSight_ = Utils.intersection(checkedSight)
      }

      return (baseNotation, baseMovement) => (targetNotation, targetMovement) => {
        const baseSight = _getSightBy_(baseNotation)(baseMovement)
        const targetSight = _getSightBy_(targetNotation)(targetMovement)

        /** @callback */
        const _getAvoidance = (tile) => !baseSight.includes(tile)

        return isKing
          ? targetSight.filter(_getAvoidance)
          : Utils.compose(
            _getCommonSight_,
            Utils.intersection(baseSight)
          )(targetSight)
      }
    }
  },

  // get predictable movement by simulating
  simulate (options = {}) {
    const {
      targetPiece,
      pretendPiece,
      initialValue = [],
      action,
      fns
    } = options
    const getTarget = getTargetInfo(fns)

    // get target infomation
    const _getTarget = (turn) => (targetPiece) => (pretendPiece) => Utils.compose(
      getTarget(turn, targetPiece, pretendPiece),
      fns.getMovement
    )(pretendPiece || targetPiece)

    return (turn) => (piece = '') => {
      const target = _getTarget(turn)(targetPiece)(pretendPiece)
      const { targetSight } = target

      // create scenarios callback
      const testOptions = { turn, piece, target, action, fns }
      const applyScenario = testScenario(testOptions)

      return targetSight.reduce(applyScenario, initialValue)
    }
  },

  /** Save records data */
  saveRecords (options = {}) {
    const { ts = +new Date() } = options
    const passArg = Utils.pass(Utils.getLastItem, Utils.push)

    return (notations) => (records) => {
      const [lastRec, push] = passArg(records)
      const turn = Helpers.detectTurn(lastRec)
      const transform = Helpers.transformMove({ turn, notations })
      const isCompletedRec = Helpers.isCompleteRec(lastRec)
      const isNew = Utils.isEmpty(lastRec) || isCompletedRec

      return (nextNotations) => {
        const move = transform(nextNotations)
        const log = { move, notations, ts }
        const data = isNew
          ? { white: log }
          : { ...lastRec, black: log }

        return push(data, isNew)
      }
    }
  },

  /** Undo records data (by turn) */
  undoRecord (options = {}) {
    return (records) => {
      if (Utils.isEmpty(records)) {
        return () => ({})
      }

      const excludedLastItem = records.slice(0, -1)
      const lastItem = Utils.getLastItem(records)
      const isWhite = Helpers.detectLastTurn(lastItem) === 'white'
      const { white, black } = lastItem
      const log = isWhite ? white : black
      const { notations, move } = log
      const revertNotations = Helpers.revertNotations(notations)
      const { before, after } = Helpers.parseMove(move)
      const revertedNotations = revertNotations(before)(after)
      const revertedRecords = isWhite
        ? excludedLastItem
        : Utils.replaceLast(records)({ white })

      return { revertedRecords, revertedNotations }
    }
  },

  /** Return next notations */
  getNextNotations (fns) {
    const pixelSize = 50 // TODO calculate pixelSize automatically
    const {
      setAxis
    } = fns
    const procParse = Utils.compose(
      Helpers.parsePosition,
      Utils.toss('position'),
      Helpers.parseNotation
    )

    /** @callback */
    const _convertAxis = (currNotation) => (nextNotation) => {
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

    return (currPosition, nextPosition) => (notations) => notations
      .reduce((nextNotations, notation) => {
        if (notation.search(currPosition) > -1) {
          const { side, piece } = Helpers.parseNotation(notation)
          const nextNotation = `${Helpers.getAlias(side)}${piece}${nextPosition}`
          const getAxis = _convertAxis(notation)

          /** @see @actions/general.js */
          setAxis({
            axis: getAxis(nextNotation),
            notation: nextNotation // for comparing
          })

          return [...nextNotations, nextNotation]
        }

        // TODO
        // - sometimes, animation doesn't work
        // 1 clue - capture / same kind of piece
        if (notation.search(nextPosition) > -1) {
          return nextNotations
        }

        return [...nextNotations, notation]
      }, [])
  },

  /** Promotion */
  promotion (records) {
    const _promotion = Core.promotion(records)

    return (notations) => _promotion(notations)
  }
}

export default {
  getEnemy: Helpers.getEnemy,
  getAlias: Helpers.getAlias,
  parseNotation: Helpers.parseNotation,
  findNotation: Helpers.findNotation,
  getMove: Helpers.getMove,
  parseMove: Helpers.parseMove,
  getMovable: Core.getMovable,
  getSight: Core.getSight,
  ...Chess
}
export { RANKS, FILES }
