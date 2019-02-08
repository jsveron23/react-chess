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
  getPureMovable,
  parseSelectedLineupItem,
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
  const { turn, lineup, selected, movableAxis } = present

  return {
    isMatching,
    turn,
    selected,
    lineup,
    ranks: RANKS,
    files: FILES,
    movableTiles: getPureMovable(movableAxis)
  }
}

const mapDispatchToProps = {
  setSelected,
  setMovableAxis,
  setLineup,
  toggleTurn
}

function mergeProps (stateProps, dispatchProps, ownProps) {
  const { turn, selected, lineup, movableTiles } = stateProps
  let nextMovable = movableTiles

  if (isExist(movableTiles)) {
    const {
      piece: selectedPiece,
      side: selectedSide,
      file: selectedFile,
      rank: selectedRank
    } = parseSelectedLineupItem(lineup, selected)
    const special = getSpecial(selectedPiece) || []

    if (isExist(special)) {
      const tile = `${selectedFile}${selectedRank}`

      nextMovable = compose(
        extract('movable'),
        computeSpecial(selectedSide, special, tile, movableTiles)
      )(lineup)
    } else {
      nextMovable = compose(
        excludeBlock(turn, lineup),

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
