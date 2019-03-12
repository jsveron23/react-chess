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

const memoizeParseSelected = memoize(parseSelected, R.equals)
const memoizeCreateTile = memoize(createTile)

/**
 * A function for `getNextMovable`
 * @param  {Object} present
 * @param  {Array}  timeline
 * @return {Object}
 */
function getFlatArgs (present, timeline) {
  const { snapshot, selected } = present
  const { piece, side, file, rank } = memoizeParseSelected(snapshot, selected)
  const tile = memoizeCreateTile(file, rank)
  const special = getSpecial(piece) || []

  return lazy({
    timeline,
    special,
    tile,
    side,
    ...present
  })
}

function mapStateToProps ({ general, ingame }) {
  const { isDoingMatch } = general
  const { present, past } = ingame
  const { turn, snapshot, selected, checkTo } = present
  const { piece, side, file, rank } = memoizeParseSelected(snapshot, selected)
  const selectedKey = `${side}${piece}`
  const selectedTile = memoizeCreateTile(file, rank)
  const nextMovableTiles = R.compose(
    getNextMovable('tiles'),
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
