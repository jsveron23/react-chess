import { connect } from 'react-redux'
import { compose, difference, map, reverse } from 'ramda'
import { Sheet } from '~/components'
import { parseLineupItem, getSide } from '~/chess/helpers'
import { isExist } from '~/utils'

/**
 * Organize by moves
 * @param  {Array} mergedHistory
 * @return {Array}
 */
const getMoveList = (mergedHistory) => {
  const len = mergedHistory.length

  return mergedHistory.reduce((acc, log, idx) => {
    const curr = log
    const prev = mergedHistory[idx + 1]

    if (isExist(prev) && len > 1) {
      const [lineupItem] = difference(curr, prev)
      const { side: currSide, piece, file, rank } = parseLineupItem(lineupItem)
      const side = getSide(currSide)
      const log = `${piece}${file}${rank}`

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

/**
 * Organize by a pack (white, black)
 * @param  {Array} moveList
 * @return {Array}
 */
const getSheet = (moveList) => {
  let sheet = []

  moveList.forEach((move, idx) => {
    const clone = [...sheet]
    const [first, ...rest] = clone

    if (isExist(move.black)) {
      sheet = [
        {
          ...first,
          black: move.black
        },
        ...rest
      ]
    } else {
      sheet = [
        {
          white: move.white
        },
        ...clone
      ]
    }
  }, [])

  return sheet
}

const mergeHistory = (presentLineup) => (pastLineupList) => [
  presentLineup,
  ...pastLineupList
]

const mapStateToProps = ({ ingame }) => {
  const { present, past } = ingame
  const sheet = compose(
    getSheet,
    reverse,
    getMoveList,
    mergeHistory(present.lineup),
    map((item) => item.lineup),
    reverse
  )(past)

  return { sheet }
}

const SheetContainer = connect(mapStateToProps)(Sheet)

export default SheetContainer
