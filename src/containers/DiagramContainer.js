import { connect } from 'react-redux'
import { compose, ifElse, thunkify } from 'ramda'
import { Diagram } from '~/components'
import { setNext, setMovable, setCapturedNext } from '~/actions/ingame'
import {
  getMovableTiles,
  appendSpecialAxis,
  rejectBlocked,
  groupByDirection,
  createTimeline
} from '~/chess/core'
import { getSpecial, parseSelected } from '~/chess/helpers'
import { RANKS, FILES } from '~/chess/constants'
import { isExist } from '~/utils'

function mapStateToProps ({ general, ingame }) {
  const { isDoingMatch } = general
  const { present, past } = ingame
  const { turn, snapshot, selected, movableAxis } = present
  const { piece, side, file, rank } = parseSelected(selected, snapshot)
  const special = getSpecial(piece) || []
  const thunkIsExist = thunkify(isExist)
  const tile = `${file}${rank}`
  const getSpecialAxisFn = compose(
    appendSpecialAxis(side, special, tile),
    createTimeline(snapshot)
  )(past)
  const getRegularAxisFn = compose(
    rejectBlocked(turn, snapshot),
    groupByDirection
  )
  const nextMovableAxis = compose(
    getMovableTiles,
    ifElse(thunkIsExist(special), getSpecialAxisFn, getRegularAxisFn)
  )(movableAxis)

  return {
    isDoingMatch,
    turn,
    snapshot,
    selectedPiece: piece,
    selectedSide: side,
    selectedFile: file,
    selectedRank: rank,
    ranks: RANKS,
    files: FILES,
    movableTiles: nextMovableAxis
  }
}

const mapDispatchToProps = {
  setMovable,
  setNext,
  setCapturedNext
}

const DiagramContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Diagram)

export default DiagramContainer
