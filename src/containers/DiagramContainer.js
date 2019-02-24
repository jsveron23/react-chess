import { connect } from 'react-redux'
import { compose, ifElse, thunkify } from 'ramda'
import { Diagram } from '~/components'
import { setNext, setMovable, setCapturedNext } from '~/actions/ingame'
import {
  getMovableTiles,
  appendSpecialAxis,
  rejectBlocked,
  groupByDirection
} from '~/chess/core'
import { getSpecial, parseSelected } from '~/chess/helpers'
import { RANKS, FILES } from '~/chess/constants'
import { isExist } from '~/utils'

function mapStateToProps ({ general, ingame }) {
  const { isDoingMatch } = general
  const { present } = ingame
  const { turn, snapshot, selected, movableAxis } = present
  const { piece, side, file, rank } = parseSelected(selected, snapshot)
  const special = getSpecial(piece) || []
  const tile = `${file}${rank}`
  const getSpecialAxisFn = appendSpecialAxis(side, special, tile, snapshot)
  const getRegularAxisFn = compose(
    rejectBlocked(turn, snapshot),
    groupByDirection
  )

  // NOTE:
  // - `get[?]AxisFn` functions will return results after applying `special` argument
  // - but those functions don't need another argument actually.
  // - `thunkify` will delay return result until applying last 1 argument which is `special`
  const nextMovableAxis = compose(
    getMovableTiles,
    ifElse(
      isExist,
      thunkify(getSpecialAxisFn)(movableAxis),
      thunkify(getRegularAxisFn)(movableAxis)
    )
  )(special)

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
