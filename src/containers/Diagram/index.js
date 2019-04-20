import { connect } from 'react-redux'
import memoize from 'memoize-one'
import * as R from 'ramda'
import { Diagram } from '~/components'
import { setNextSnapshot, setNextMovableAxis, setNextCapturedSnapshot } from '~/actions/ingame'
import { getNextMovable, mesurePosition, getMovableTilesGroup } from '~/chess/core'
import { createTimeline, getSpecial, parseCode, getPrevSnapshots } from '~/chess/helpers'
import { RANKS, FILES } from '~/chess/constants'
import { lazy, isExist, isEmpty } from '~/utils'

// no extra rendering when clicking same Chess piece
const memoizeGetNextMovable = memoize(
  R.compose(
    getNextMovable('tiles'),
    lazy
  ),
  R.equals
)

function mapStateToProps ({ general, ingame }) {
  const { isDoingMatch } = general
  const { present, past } = ingame
  const { turn, snapshot, selected, checkTo, checkBy } = present
  const timeline = createTimeline(snapshot, past)
  const { piece, side, code, tile: selectedTile } = parseCode(selected)
  const special = getSpecial(piece)
  let nextMovableTiles = memoizeGetNextMovable({
    ...present,
    timeline,
    special,
    side,
    tile: selectedTile
  })

  let getPosition

  // for animation
  if (isExist(past)) {
    const prevSnapshotList = getPrevSnapshots(past)
    const [prevSnapshot] = prevSnapshotList

    if (isEmpty(nextMovableTiles)) {
      // until getting last argument
      getPosition = mesurePosition(snapshot, prevSnapshot)
    }

    if (isExist(checkBy)) {
      const movableTilesGroup = getMovableTilesGroup(turn, checkTo, checkBy, timeline)

      console.log(Object.keys(movableTilesGroup).every((key) => isEmpty(movableTilesGroup[key])))

      nextMovableTiles = movableTilesGroup[code]
    }
  }

  return {
    turn,
    checkTo,
    snapshot,
    getPosition,
    selectedTile,
    isDoingMatch,
    ranks: RANKS,
    files: FILES,
    selectedKey: `${side}${piece}`,
    movableTiles: nextMovableTiles
  }
}

const mapDispatchToProps = {
  setNextMovableAxis,
  setNextSnapshot,
  setNextCapturedSnapshot
}

const DiagramContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Diagram)

export default DiagramContainer
