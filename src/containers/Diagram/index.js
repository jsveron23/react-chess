import { connect } from 'react-redux'
import memoize from 'memoize-one'
import * as R from 'ramda'
import { Diagram } from '~/components'
import { setNextSnapshot, setNextMovableAxis, setNextCapturedSnapshot } from '~/actions/ingame'
import { getNextMovable, getFiniteMovableTiles, mesurePosition, getMovableAxis } from '~/chess/core'
import {
  createTimeline,
  getSpecial,
  parseSelected,
  getPrevSnapshotList,
  getOneSidedCodeList,
  parseCode
} from '~/chess/helpers'
import { RANKS, FILES } from '~/chess/constants'
import { lazy, isExist, isEmpty } from '~/utils'

// no extra rendering when clicking same Chess piece
const memoizeGetNextMovable = memoize(
  R.compose(
    getNextMovable('tiles'),
    lazy
  ),
  R.equals
)

function mapStateToProps ({ general, ingame }) {
  const { isDoingMatch } = general
  const { present, past } = ingame
  const { turn, snapshot, selected, checkTo, checkBy } = present
  const timeline = createTimeline(snapshot, past)
  const { piece, side, tile: selectedTile } = parseSelected(snapshot, selected)
  const special = getSpecial(piece)
  let nextMovableTiles = memoizeGetNextMovable({
    ...present,
    timeline,
    special,
    side,
    tile: selectedTile
  })

  let getPosition

  // for animation
  if (isExist(past)) {
    const prevSnapshotList = getPrevSnapshotList(past)
    const [prevSnapshot] = prevSnapshotList

    if (isEmpty(nextMovableTiles)) {
      // until getting last argument
      getPosition = mesurePosition(snapshot, prevSnapshot)
    }

    if (isExist(checkBy)) {
      // TODO: optimize
      const awaitGetFiniteMovableTiles = getFiniteMovableTiles(checkTo, checkBy)
      const teammate = getOneSidedCodeList(side, snapshot)
      const movableTilesList = teammate.reduce((acc, code) => {
        const parsedCode = parseCode(code)
        const movableTiles = R.compose(
          awaitGetFiniteMovableTiles(parsedCode.piece),
          memoizeGetNextMovable
        )({
          ...present,
          movableAxis: getMovableAxis(parsedCode.tile, turn, parsedCode.piece),
          timeline,
          side,
          special: getSpecial(parsedCode.piece),
          tile: parsedCode.tile
        })

        // console.log(`Debug - ${parsedCode.piece}${parsedCode.tile}`, movableTiles);

        if (isEmpty(movableTiles)) {
          return acc
        }

        return [...acc, movableTiles]
      }, [])

      // TODO: code works but only King return movable tiles not properly
      console.log(
        'Checkmate!!',
        R.compose(
          isEmpty,
          R.flatten
        )(movableTilesList)
      )

      nextMovableTiles = awaitGetFiniteMovableTiles(piece, nextMovableTiles)
    }
  }

  return {
    turn,
    checkTo,
    snapshot,
    getPosition,
    selectedTile,
    isDoingMatch,
    ranks: RANKS,
    files: FILES,
    selectedKey: `${side}${piece}`,
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
