import React from 'react'
import PropTypes from 'prop-types'
// import cx from 'classnames'
import { Rank, File } from '~/components'
import css from './Board.css'

const Board = ({ isMatching, ranks, files }) => {
  if (!isMatching) {
    return null
  }

  return (
    <div className={css.board}>
      {ranks.map((rankName) => {
        return (
          <Rank key={rankName}>
            {files.map((fileName) => {
              const tile = `${rankName}${fileName}`

              return <File key={tile} tileName={tile} />
            })}
          </Rank>
        )
      })}
    </div>
  )
}

Board.propTypes = {
  isMatching: PropTypes.bool.isRequired,
  ranks: PropTypes.string.isRequired,
  files: PropTypes.string.isRequired
}

export default Board
