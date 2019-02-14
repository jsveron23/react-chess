import { difference, reduce, compose, prop as extract } from 'ramda'
import { parseLineupItem, getSide } from '~/chess/helpers'
import { isExist } from '~/utils'

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
      const { side: currSide, piece, file, rank } = compose(
        parseLineupItem,
        extract(0),
        difference(currLineup)
      )(prevLineup)
      const isPawn = piece === 'P'
      const side = getSide(currSide)
      const log = `${isPawn ? '' : piece}${file}${rank}`

      return [
        ...acc,
        {
          [side]: log
        }
      ]
    }

    return acc
  }

  return reduce(reduceFn, [])(mergedLineups)
}

export default alignHistory
