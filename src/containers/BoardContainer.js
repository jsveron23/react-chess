import { connect } from 'react-redux'
import { compose } from 'ramda'
import { Board } from '~/components'
import { selectPiece, setCurrentMovable, toggleTurn } from '~/actions/general'
import { setNotations } from '~/actions/notations'
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

function mapStateToProps ({ general, notations }) {
  const { isMatching, turn, selected, currentMovable } = general
  const movableTiles = getPureMovable(currentMovable)

  return {
    isMatching,
    turn,
    selected,
    notations,
    movableTiles,
    ranks: RANKS,
    files: FILES
  }
}

const mapDispatchToProps = {
  selectPiece,
  setCurrentMovable,
  setNotations,
  toggleTurn
}

function mergeProps (stateProps, dispatchProps, ownProps) {
  const { selected, notations, movableTiles } = stateProps
  let nextMovable = movableTiles

  if (isExist(movableTiles)) {
    const {
      piece: selectedPiece,
      side: selectedSide,
      file: selectedFile,
      rank: selectedRank
    } = parseSelectedNotation(notations, selected)
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
        notations
      )

      nextMovable = movable
    }

    if (isNotKnight && isNotPawn) {
      nextMovable = compose(
        excludeBlock(notations),

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
