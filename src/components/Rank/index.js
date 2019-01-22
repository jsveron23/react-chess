import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { File } from '~/components'
import css from './Rank.css'

const Rank = ({ turn, notations, files, rankName }) => {
  const cls = cx(css.rank, 'l-flex-row')

  return (
    <div className={cls} data-rank={rankName}>
      {files.map((fileName) => {
        const tile = `${fileName}${rankName}`
        const notation = notations.find((n) => n.indexOf(tile) > -1) || ''
        const [c, p] = notation.split('')

        return (
          <File
            key={tile}
            turn={turn}
            color={c}
            piece={p}
            fileName={fileName}
            tileName={tile}
          />
        )
      })}
    </div>
  )
}

Rank.propTypes = {
  notations: PropTypes.array.isRequired,
  turn: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  rankName: PropTypes.string.isRequired
}

export default Rank
