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

// reduce arguments length
const memoizeParseSelected = memoize(parseSelected, R.equals)

/**
 * @param  {Object}   present
 * @param  {Array}    timeline
 * @return {Function}
 */
const createGetFlatArgs = R.curry(function createGetFlatArgs (
  present,
  timeline
) {
  const { snapshot, selected } = present
  const { piece, side, file, rank } = memoizeParseSelected(snapshot, selected)
  const special = getSpecial(piece) || []
  const tile = createTile(file, rank)

  return {
    timeline,
    special,
    tile,
    side,
    ...present
  }
})

function mapStateToProps ({ general, ingame }) {
  const { isDoingMatch } = general
  const { present, past } = ingame
  const { turn, snapshot, selected, checkTo } = present
  const { piece, side, file, rank } = memoizeParseSelected(snapshot, selected)
  const nextMovableTiles = R.compose(
    getNextMovable('tiles'),
    lazy,
    createGetFlatArgs(present),
    createTimeline(snapshot)
  )(past)

  return {
    isDoingMatch,
    turn,
    checkTo,
    snapshot,
    ranks: RANKS,
    files: FILES,
    selectedPiece: piece,
    selectedSide: side,
    selectedFile: file,
    selectedRank: rank,
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
