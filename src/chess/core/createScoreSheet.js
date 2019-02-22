import { isExist } from '~/utils'

/**
 * @callback
 * @param  {Array}  sheet
 * @param  {Object} move
 * @return {Array}
 */
function reduceCb (sheet, move) {
  const createWhite = {
    white: move.white
  }

  if (isExist(move.black)) {
    const [first, ...rest] = sheet
    const createBlack = {
      ...first,
      black: move.black
    }

    return [createBlack, ...rest]
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
