import { difference, reduce, compose, curry, prop as extract } from 'ramda'
import { parseLineupItem, getSide } from '~/chess/helpers'
import { isExist } from '~/utils'

const getDiffrenceLineupItem = curry((aLineupItem, bLineupItem) => {
  return compose(
    parseLineupItem,
    extract(0),
    difference(aLineupItem)
  )(bLineupItem)
})

/**
 * Align lineups by move sequence before align scrore sheet
 * @param  {Array} mergedLineups
 * @return {Array}
 */
function alignHistory (mergedLineups) {
  const len = mergedLineups.length
  const reduceFn = (acc, currLineup) => {
    const prevIdx = mergedLineups.indexOf(currLineup) + 1
    const prevLineup = mergedLineups[prevIdx]

    if (isExist(prevLineup) && len > 1) {
      let lineupItemObj = getDiffrenceLineupItem(currLineup)(prevLineup)
      let capturedPiece = ''

      if (prevLineup.length !== currLineup.length) {
        const { piece } = getDiffrenceLineupItem(prevLineup)(currLineup)

        capturedPiece = piece
      }

      const { side, piece, file, rank } = lineupItemObj
      const tile = `${file}${rank}`
      const isPawn = piece === 'P'
      const isCaptured = isExist(capturedPiece)
      const log = `${isPawn ? '' : piece}${isCaptured ? 'x' : ''}${tile}`

      return [
        ...acc,
        {
          [getSide(side)]: log
        }
      ]
    }

    return acc
  }

  return reduce(reduceFn, [])(mergedLineups)
}

export default curry(alignHistory)
