import * as Utils from '@utils'
import * as Helpers from './helpers'
import * as Core from './core'
import testScenario, { getTargetInfo } from './simulate'
import { RANKS, FILES } from './constants'

/**
 * Chess engine
 */
class Chess {
  static getEnemy = Helpers.getEnemy
  static getAlias = Helpers.getAlias
  static parseNotation = Helpers.parseNotation
  static findNotation = Helpers.findNotation
  static getMove = Helpers.getMove

  static getMovable = Core.getMovable
  static getSight = Core.getSight

  /**
   * Get blockable tiles to protect King
   * TODO
   * - remove King piece of blocked
   */
  static getBlocks (fns, options) {
    const {
      getAttackingRoute
    } = fns
    const {
      isKing = false
    } = options
    let _getCommonSight

    return (notations, records) => {
      const _getSightBy = Core.getSightBy(notations, records)
      const exceptKing = !isKing

      if (exceptKing) {
        const getCommonSights = Core.getCommonSights(notations, records)
        const checkedSight = getAttackingRoute(getCommonSights)

        _getCommonSight = Utils.intersection(checkedSight)
      }

      return (baseNotation, baseMovement) => (targetNotation, targetMovement) => {
        const baseSight = _getSightBy(baseNotation)(baseMovement)
        const targetSight = _getSightBy(targetNotation)(targetMovement)

        /** @callback */
        const _getAvoidance = (tile) => !baseSight.includes(tile)

        return isKing
          ? targetSight.filter(_getAvoidance)
          : Utils.compose(
            _getCommonSight,
            Utils.intersection(baseSight)
          )(targetSight)
      }
    }
  }

  /**
   * Simulate
   */
  static simulate (fns) {
    const apply = Utils.apply(fns)
    const [getTarget, applyScenarioOptions] = apply(getTargetInfo, testScenario)

    /**
     * Get target infomation
     */
    const _getTarget = (turn) => (targetPiece, pretendPiece) => Utils.compose(
      getTarget(turn, targetPiece, pretendPiece),
      fns.getMovement
    )(pretendPiece || targetPiece)

    return (turn, piece = '') => (config) => {
      const {
        targetPiece,
        pretendPiece,
        initialValue = [],
        action
      } = config
      const target = _getTarget(turn)(targetPiece, pretendPiece)
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

    return (nextNotations, ts = +new Date()) => {
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
    const { before, after } = Helpers.parseMove(move)
    const revertedNotations = revertNotations(before, after)
    const revertedRecords = isWhite
      ? excludedLastItem
      : Utils.replaceLast(records)({ white })

    return (/* TODO use it later */) => ({ revertedRecords, revertedNotations })
  }

  /**
   * Return next notations
   */
  static getNextNotations (currPosition, nextPosition) {
    const procParse = Utils.compose(
      Helpers.parsePosition,
      Utils.toss('position'),
      Helpers.parseNotation
    )

    /**
     * Convert notation to get axis
     * @callback
     * @description
     * # b1 to h3
     * => [h(8) - b(2) = 6, 3 - 1 = 2]
     * => ([6, 2]) x pixel
     * => [300, 100]
     * => transform: translate(300px, 100px)
     * TODO calculate pixelSize automatically
     */
    const _convertAxis = (currNotation) => (nextNotation) => (pixelSize = 50) => {
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

    return (setAxis) => (notations) => notations.map((notation) => {
      if (notation.search(currPosition) > -1) {
        const { side, piece } = Helpers.parseNotation(notation)
        const nextNotation = `${Helpers.getAlias(side)}${piece}${nextPosition}`
        const getAxis = _convertAxis(notation)(nextNotation)

        /** @see @actions/general.js */
        setAxis({
          axis: getAxis(/* pixelSize */),
          notation: nextNotation // for comparing
        })

        return nextNotation
      }

      return notation
    })
  }

  /**
   * Promotion
   */
  static promotion (notations) {
    return (records) => Core.promotion(notations, records)
  }
}

export default Chess
export { RANKS, FILES }
