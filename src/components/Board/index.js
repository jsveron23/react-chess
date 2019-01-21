import React from 'react'
import PropTypes from 'prop-types'
import { Rank, File } from '~/components'
import css from './Board.css'

const Board = ({ isMatching, notations, ranks, files }) => {
  if (!isMatching) {
    return null
  }

  return (
    <div className={css.board}>
      {ranks.map((rankName) => {
        return (
          <Rank key={rankName} rankName={rankName}>
            {files.map((fileName) => {
              const tile = `${fileName}${rankName}`
              const notation = notations.find((n) => n.indexOf(tile) > -1) || ''
              const [c, p] = notation.split('')

              return (
                <File
                  key={tile}
                  color={c}
                  piece={p}
                  fileName={fileName}
                  tileName={tile}
                />
              )
            })}
          </Rank>
        )
      })}
    </div>
  )
}

Board.propTypes = {
  isMatching: PropTypes.bool.isRequired,
  ranks: PropTypes.array.isRequired,
  files: PropTypes.array.isRequired
}

export default Board
