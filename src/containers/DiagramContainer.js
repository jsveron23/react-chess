import { connect } from 'react-redux'
import memoize from 'memoize-one'
import { curry, compose, equals } from 'ramda'
import { Diagram } from '~/components'
import {
  setNextSnapshot,
  setNextMovableAxis,
  setNextCapturedSnapshot
} from '~/actions/ingame'
import { getNextMovable, createTimeline } from '~/chess/core'
import { getSpecial, parseSelected, createTile } from '~/chess/helpers'
import { RANKS, FILES } from '~/chess/constants'

// reduce arguments length
const memoizeParseSelected = memoize(parseSelected, equals)

/**
 * Create getFlatArgs function
 * @param  {Object}   present
 * @param  {Object}   past
 * @return {Function}
 */
function createGetFlatArgs (present, past) {
  const { snapshot, selected } = present
  const timeline = createTimeline(snapshot, past)

  /**
   * Passing flatted arguments by function return (no more destructuring assignment)
   * @return {Object}
   */
  return (/* getFlatArgs */) => {
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
  }
}

function mapStateToProps ({ general, ingame }) {
  const { isDoingMatch } = general
  const { present, past } = ingame
  const { turn, snapshot, selected, checkTo } = present
  const { piece, side, file, rank } = memoizeParseSelected(snapshot, selected)
  const nextMovableTiles = compose(
    getNextMovable('tiles'),
    curry(createGetFlatArgs)(present)
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
