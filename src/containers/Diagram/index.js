import { connect } from 'react-redux'
import { Diagram } from '~/components'
import {
  setNextSnapshot,
  setNextMovableAxis,
  setNextCapturedSnapshot
} from '~/actions/ingame'
import { mesurePosition, getMovableTilesGroup } from '~/chess/core'
import { createTimeline, getSpecial, parseCode, getPrevSnapshots } from '~/chess/helpers'
import { RANKS, FILES } from '~/chess/constants'
import { isExist, isEmpty, merge } from '~/utils'
import getMovable from './getMovable'

function mapStateToProps ({ general, ingame }) {
  const { isDoingMatch } = general
  const { present, past } = ingame
  const { turn, snapshot, selected, checkTo, checkBy } = present
  const timeline = createTimeline(snapshot, past)
  const { piece, side, code, tile: selectedTile } = parseCode(selected)
  const special = getSpecial(piece)
  let nextMovableTiles = getMovable({
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

      // console.log(
      //   Object.keys(movableTilesGroup).every((key) => isEmpty(movableTilesGroup[key]))
      // )

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
    selectedKey: merge.txt(side, piece),
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
