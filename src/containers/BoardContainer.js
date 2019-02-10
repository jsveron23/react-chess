import { connect } from 'react-redux'
import { compose, prop as extract } from 'ramda'
import { Board } from '~/components'
import {
  toggleTurn,
  setLineup,
  setSelected,
  setMovableAxis
} from '~/actions/ingame'
import {
  getMovableTiles,
  getDirection,
  excludeBlock,
  computeSpecial
} from '~/chess/core'
import { getSpecial, parseSelected } from '~/chess/helpers'
import { RANKS, FILES } from '~/chess/constants'
import { isExist } from '~/utils'

function mapStateToProps ({ general, ingame }) {
  const { isMatching } = general
  const { present } = ingame
  const { turn, lineup, selected, movableAxis } = present
  let nextMovable

  if (isExist(movableAxis)) {
    const {
      piece: selectedPiece,
      side: selectedSide,
      file: selectedFile,
      rank: selectedRank
    } = parseSelected(lineup, selected)
    const special = getSpecial(selectedPiece) || []

    if (isExist(special)) {
      const tile = `${selectedFile}${selectedRank}`

      nextMovable = compose(
        extract('movable'),
        computeSpecial(selectedSide, special, tile, lineup),
        getMovableTiles // TODO: remove this
      )(movableAxis)
    } else {
      nextMovable = compose(
        excludeBlock(turn, lineup),

        // to get rid of block tiles, need direction infomation
        getDirection
      )(movableAxis)
    }
  }

  return {
    isMatching,
    turn,
    selected,
    lineup,
    ranks: RANKS,
    files: FILES,
    movableTiles: nextMovable
  }
}

const mapDispatchToProps = {
  setSelected,
  setMovableAxis,
  setLineup,
  toggleTurn
}

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)

export default BoardContainer
