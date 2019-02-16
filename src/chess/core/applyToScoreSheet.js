import { reduce } from 'ramda'
import { isExist } from '~/utils'

/**
 * Align score sheet
 * @param  {Array} moveList
 * @return {Array}
 */
const applyToScoreSheet = (moveList) => {
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

export default applyToScoreSheet
