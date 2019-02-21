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
    const appendedBlack = {
      ...first,
      black: move.black
    }

    return [appendedBlack, ...rest]
  }

  const createWhite = {
    white: move.white
  }

  return [createWhite, ...sheet]
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
