import { connect } from 'react-redux'
import { compose, prop as extract } from 'ramda'
import { Board } from '~/components'
import { setLineup, setNext, setMovable } from '~/actions/ingame'
import {
  getMovableTiles,
  getDirection,
  excludeBlock,
  computeSpecial
} from '~/chess/core'
import {
  getSpecial,
  parseSelected,
  findLineupItem,
  parseLineupItem
} from '~/chess/helpers'
import { RANKS, FILES } from '~/chess/constants'
import { isExist } from '~/utils'

function mapStateToProps ({ general, ingame }) {
  const { isMatching } = general
  const { present } = ingame
  const { turn, lineup, selected, movableAxis } = present
  const {
    piece: selectedPiece,
    side: selectedSide,
    file: selectedFile,
    rank: selectedRank
  } = parseSelected(selected, lineup)
  const selecteSpecial = getSpecial(selectedPiece) || []
  let nextMovable

  if (isExist(movableAxis)) {
    if (isExist(selecteSpecial)) {
      const tile = `${selectedFile}${selectedRank}`

      nextMovable = compose(
        extract('movable'),
        computeSpecial(selectedSide, selecteSpecial, tile, lineup),
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
    selectedPiece,
    selectedSide,
    selectedFile,
    selectedRank,
    lineup,
    ranks: RANKS,
    files: FILES,
    movableTiles: nextMovable
  }
}

const mapDispatchToProps = {
  setLineup,
  setMovable,
  setNext
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    getPieceProps ({ tile, lineup }) {
      return compose(
        parseLineupItem,
        findLineupItem(tile)
      )(lineup)
    }
  }
}

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Board)

export default BoardContainer
