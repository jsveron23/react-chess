import { connect } from 'react-redux'
import memoize from 'memoize-one'
import * as R from 'ramda'
import { Diagram } from '~/components'
import {
  setNextSnapshot,
  setNextMovableAxis,
  setNextCapturedSnapshot
} from '~/actions/ingame'
import { getNextMovable } from '~/chess/core'
import {
  createTimeline,
  getSpecial,
  parseSelected,
  createTile
} from '~/chess/helpers'
import { RANKS, FILES } from '~/chess/constants'
import { lazy } from '~/utils'

const memoAwaitParseSelected = memoize(
  (snapshot) => parseSelected(snapshot),
  R.equals
)
const memoCreateTile = memoize(createTile)

function getFlatArgs (present, timeline) {
  const { snapshot, selected } = present
  const awaitParseSelected = memoAwaitParseSelected(snapshot)
  const { piece, side, file, rank } = awaitParseSelected(selected)
  const tile = memoCreateTile(file, rank)
  const special = getSpecial(piece)

  return {
    timeline,
    special,
    tile,
    side,
    ...present
  }
}

function mapStateToProps ({ general, ingame }) {
  const { isDoingMatch } = general
  const { present, past } = ingame
  const { turn, snapshot, selected, checkTo } = present
  const awaitParseSelected = memoAwaitParseSelected(snapshot)
  const { piece, side, file, rank } = awaitParseSelected(selected)
  const selectedKey = `${side}${piece}`
  const selectedTile = memoCreateTile(file, rank)
  const nextMovableTiles = R.compose(
    getNextMovable('tiles'),
    lazy,
    R.curry(getFlatArgs)(present),
    createTimeline(snapshot)
  )(past)

  return {
    isDoingMatch,
    turn,
    checkTo,
    snapshot,
    selectedKey,
    selectedTile,
    ranks: RANKS,
    files: FILES,
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
