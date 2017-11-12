import React from 'react'
import cx from 'classnames'
import css from './rank.css'

const rank = ({ map, pieces, notation }) => {
  const piece = pieces.find(p => (p.search(notation) > -1))

  return (
    <span data-notation={notation} className={cx(css.rank, 'l-flex-col', 'l-flex-center', 'l-flex-middle')}>
      <p>{piece || ''}</p>
      <p>{notation}</p>
    </span>
  )
}

export default rank
