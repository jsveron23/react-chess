import { connect } from 'react-redux'
import { compose, difference, map, reverse } from 'ramda'
import { Sheet } from '~/components'
import { parseLineupItem, getSide } from '~/chess/helpers'
import { isExist } from '~/utils'

const getPastLineupList = compose(
  map((item) => item.lineup),
  reverse
)

const mapStateToProps = ({ ingame }) => {
  const { present, past } = ingame
  const pastLineupList = getPastLineupList(past)
  const mergedHistory = [present.lineup, ...pastLineupList]
  const len = mergedHistory.length
  // let nextHistory = []

  // score sheet logic
  const moves = mergedHistory.reduce((acc, log, idx) => {
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

  let sheet = []

  reverse(moves).forEach((move, idx) => {
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

  return { sheet }
}

const SheetContainer = connect(mapStateToProps)(Sheet)

export default SheetContainer
