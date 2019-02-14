import { reduce } from 'ramda'
import { isExist } from '~/utils'

/**
 * Align score sheet by chess sides (white, black)
 * @param  {Array} moveList
 * @return {Array}
 */
const alignScoreSheet = (moveList) => {
  const reduceFn = (sheet, move) => {
    if (isExist(move.black)) {
      const [first, ...rest] = sheet

      return [
        {
          ...first,
          black: move.black
        },
        ...rest
      ]
    }

    return [
      {
        white: move.white
      },
      ...sheet
    ]
  }

  return reduce(reduceFn, [])(moveList)
}

export default alignScoreSheet
