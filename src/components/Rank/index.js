import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { compose, split } from 'ramda'
import getPiece, { File } from '~/components'
import { noop } from '~/utils'
import { getNotation } from '~/chess/helpers'
import css from './Rank.css'

const Rank = ({
  turn,
  lineup,
  files,
  rankName,
  selected,
  movableTiles,
  setSelected,
  setMovableTiles,
  drawLineup,
  toggleTurn
}) => {
  const cls = cx(css.rank, 'l-flex-row')

  return (
    <div className={cls} data-rank={rankName}>
      {files.map((fileName) => {
        const tile = `${fileName}${rankName}`
        const [color, piece] = compose(
          split(''),
          getNotation(lineup)
        )(tile)
        const Piece = getPiece({ color, piece })

        return (
          <File
            key={tile}
            turn={turn}
            piece={piece}
            Piece={Piece}
            lineup={lineup}
            selected={selected}
            fileName={fileName}
            tile={tile}
            movableTiles={movableTiles}
            setSelected={setSelected}
            setMovableTiles={setMovableTiles}
            drawLineup={drawLineup}
            toggleTurn={toggleTurn}
          />
        )
      })}
    </div>
  )
}

Rank.propTypes = {
  lineup: PropTypes.array.isRequired,
  turn: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  rankName: PropTypes.string.isRequired,
  selected: PropTypes.string,
  currentMovableTiles: PropTypes.array,
  setSelected: PropTypes.func,
  setMovableTiles: PropTypes.func,
  drawLineup: PropTypes.func,
  toggleTurn: PropTypes.func
}

Rank.defaultProps = {
  setSelected: noop,
  setMovableTiles: noop,
  drawLineup: noop,
  toggleTurn: noop
}

export default Rank
