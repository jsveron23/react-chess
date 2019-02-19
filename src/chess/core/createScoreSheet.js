import { isExist } from '~/utils'

/**
 * @callback
 * @param  {Array}  sheet
 * @param  {Object} move
 * @return {Array}
 */
function reduceCb (sheet, move) {
  if (isExist(move.black)) {
    const [first, ...rest] = sheet
    const appendedScore = {
      ...first,
      black: move.black
    }

    return [appendedScore, ...rest]
  }

  return [
    {
      white: move.white
    },
    ...sheet
  ]
}

/**
 * Create score sheet
 * @param  {Array} moveList
 * @return {Array}
 */
function createScoreSheet (moveList) {
  return moveList.reduce(reduceCb, [])
}

export default createScoreSheet
