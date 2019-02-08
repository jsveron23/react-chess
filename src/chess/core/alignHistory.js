import { difference } from 'ramda'
import { parseLineupItem, getSide } from '~/chess/helpers'
import { isExist } from '~/utils'

/**
 * Align history by move sequence before align scrore sheet
 * @param  {Array} mergedHistory
 * @return {Array}
 */
function alignHistory (mergedHistory) {
  const len = mergedHistory.length

  return mergedHistory.reduce((acc, lineup, idx) => {
    const currLineup = lineup
    const prevLineup = mergedHistory[idx + 1]

    if (isExist(prevLineup) && len > 1) {
      const [lineupItem] = difference(currLineup, prevLineup)
      const { side: currSide, piece, file, rank } = parseLineupItem(lineupItem)
      const side = getSide(currSide)
      const log = `${piece === 'P' ? '' : piece}${file}${rank}`

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
