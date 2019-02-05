import { connect } from 'react-redux'
import { compose } from 'ramda'
import { Board } from '~/components'
import {
  toggleTurn,
  drawLineup,
  setSelected,
  setMovableTiles
} from '~/actions/ingame'
import {
  getPureMovable,
  parseSelectedNotation,
  transformMovableAsDirection,
  excludeBlock,
  computeSpecial
} from '~/chess/core'
import { getSpecial } from '~/chess/helpers'
import { RANKS, FILES } from '~/chess/constants'
import { isExist } from '~/utils'

function mapStateToProps ({ general, ingame }) {
  const { isMatching } = general
  const { present } = ingame
  const { turn, lineup, selected, movableTiles } = present

  return {
    isMatching,
    turn,
    selected,
    lineup,
    ranks: RANKS,
    files: FILES,
    movableTiles: getPureMovable(movableTiles)
  }
}

const mapDispatchToProps = {
  setSelected,
  setMovableTiles,
  drawLineup,
  toggleTurn
}

function mergeProps (stateProps, dispatchProps, ownProps) {
  const { selected, lineup, movableTiles } = stateProps
  let nextMovable = movableTiles

  if (isExist(movableTiles)) {
    const {
      piece: selectedPiece,
      side: selectedSide,
      file: selectedFile,
      rank: selectedRank
    } = parseSelectedNotation(lineup, selected)
    const special = getSpecial(selectedPiece) || []
    const isNotKnight = !special.includes('jumpover')
    const isNotPawn = movableTiles.length > 1

    if (isExist(special)) {
      const tile = `${selectedFile}${selectedRank}`

      const { movable } = computeSpecial(
        selectedSide,
        special,
        tile,
        movableTiles,
        lineup
      )

      nextMovable = movable
    }

    if (isNotKnight && isNotPawn) {
      nextMovable = compose(
        excludeBlock(lineup),

        // to get rid of block tiles, need direction infomation
        transformMovableAsDirection
      )(nextMovable)
    }
  }

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    movableTiles: nextMovable
  }
}

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Board)

export default BoardContainer
