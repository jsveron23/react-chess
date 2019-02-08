import { isExist } from '~/utils'

/**
 * Align score sheet by chess sides (white, black)
 * @param  {Array} moveList
 * @return {Array}
 */
const alignScoreSheet = (moveList) => {
  return moveList.reduce((sheet, move, idx) => {
    if (isExist(move.black)) {
      const clone = [...sheet]
      const [first, ...rest] = clone

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
  }, [])
}

export default alignScoreSheet
