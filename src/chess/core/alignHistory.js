import { difference } from 'ramda'
import { parseLineupItem, getSide } from '~/chess/helpers'
import { isExist } from '~/utils'

/**
 * Align lineups by move sequence before align scrore sheet
 * @param  {Array} mergedLineups
 * @return {Array}
 */
function alignHistory (mergedLineups) {
  const len = mergedLineups.length

  return mergedLineups.reduce((acc, lineup, idx) => {
    const currLineup = lineup
    const prevLineup = mergedLineups[idx + 1]

    if (isExist(prevLineup) && len > 1) {
      const [lineupItem] = difference(currLineup, prevLineup)
      const { side: currSide, piece, file, rank } = parseLineupItem(lineupItem)
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
  }, [])
}

export default alignHistory
