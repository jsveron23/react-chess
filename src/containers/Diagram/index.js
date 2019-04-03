import { connect } from 'react-redux'
import * as R from 'ramda'
import { Diagram } from '~/components'
import {
  setNextSnapshot,
  setNextMovableAxis,
  setNextCapturedSnapshot
} from '~/actions/ingame'
import { getNextMovable, mesurePosition } from '~/chess/core'
import {
  createTimeline,
  getSpecial,
  parseSelected,
  createTile,
  getPrevSnapshotList
} from '~/chess/helpers'
import { RANKS, FILES } from '~/chess/constants'
import { lazy, merge, isExist, isEmpty } from '~/utils'

function mapStateToProps ({ general, ingame }) {
  const { present, past } = ingame
  const { turn, snapshot, selected, checkTo } = present
  const timeline = createTimeline(snapshot, past)
  const { piece, side, file, rank } = parseSelected(snapshot, selected)
  const special = getSpecial(piece)
  const selectedTile = createTile(file, rank)
  const nextMovableTiles = R.compose(
    getNextMovable('tiles'),
    lazy,
    merge({ ...present })
  )({
    timeline,
    special,
    side,
    tile: selectedTile
  })
  let animate = {}

  // for animation
  if (isExist(past) && isEmpty(nextMovableTiles)) {
    const [prevSnapshot] = getPrevSnapshotList(past)

    animate = mesurePosition(snapshot, prevSnapshot, 49.75)
  }

  return {
    turn,
    checkTo,
    snapshot,
    animate,
    selectedTile,
    ranks: RANKS,
    files: FILES,
    selectedKey: `${side}${piece}`,
    isDoingMatch: general.isDoingMatch,
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
