import { isEmpty, isExist } from '@utils'
import Chess from './'

/**
 * Pawn moves 2 steps in front of initial
 * @param  {Object} args
 * @param  {Array}  args.direction
 * @param  {string} args.position  - current position
 * @return {Array}
 */
export function initDouble ({ direction, position }) {
  const isInit = /^.(2|7)$/.test(position)
  const oneStepFurther = [0, 2] // axis
  const [firstAxisList] = direction

  return isInit ? [firstAxisList, [oneStepFurther]] : [firstAxisList]
}

/**
 * Pawn can attack with diagonal movement
 * @param  {Object} args
 * @param  {Array}  args.direction
 * @param  {string} args.position
 * @param  {Array}  args.records
 * @return {Array}
 */
export function enPassant ({ direction, position, records }) {
  /**
   * Calculate how many step fowards
   * @param  {String} moves
   * @return {Number}
   */
  const howManyStepFowards = moves => {
    const diffX = moves
      .split(' ')
      .map(notation => (parseInt(notation.split('').slice(-1), 10)))
      .reduce((prevNotation, currNotation) => (currNotation - prevNotation))

    return Math.abs(diffX)
  }

  /**
   * Predict turn
   * @param  {Object}  record
   * @return {Boolean}
   */
  const isWhiteTurned = record => {
    return (
      isEmpty(record) ||
      (isExist(record) && isExist(record.white) && isExist(record.black))
    )
  }

  /**
   * Enemy move
   * @param  {Object} record
   * @param  {String} propName
   * @return {Array}
   */
  const enemyMoves = (record, propName) => {
    return isExist(last) ? record[propName].move : []
  }

  const [last] = records.slice(-1)
  const enemy = { w: 'black', b: 'white' }
  const turn = isWhiteTurned(last) ? 'w' : 'b'
  const lastEnemyMoves = enemyMoves(last, enemy[turn])
  const diffX = isExist(lastEnemyMoves) ? howManyStepFowards(lastEnemyMoves[0]) : 0
  const is2Steps = diffX === 2
  const isAdjusted = parseInt(position.substr(-1), 10) === (isExist(lastEnemyMoves) && parseInt(lastEnemyMoves[0].substr(-1), 10))

  if (is2Steps && isAdjusted) {
    const currFile = position.substr(-2, 1)
    const currFileIdx = Chess.getFileIdx(currFile)
    const enemyFile = lastEnemyMoves[0].substr(-2, 1)
    const enemyFileIdx = Chess.getFileIdx(enemyFile)
    const nextX = enemyFileIdx - currFileIdx

    return [[[nextX, 1]]]
  }

  return [...direction]
}
//
// /**
//  * Pawn can promotion (queen only atm)
//  * @return {Array}
//  */
// promotion () {
//   // change piece
// },
//
// castling () {
//   //
// }
