import { reduce } from 'ramda'
import { isExist } from '~/utils'

/**
 * Create score sheet
 * @param  {Array} moveList
 * @return {Array}
 */
const createScoreSheet = (moveList) => {
  const reduceCb = (sheet, move) => {
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

  return reduce(reduceCb, [])(moveList)
}

export default createScoreSheet
