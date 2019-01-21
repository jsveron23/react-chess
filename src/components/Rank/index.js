import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import css from './Rank.css'

const Rank = ({ rankName, children }) => {
  const cls = cx(css.rank, 'l-flex-row')

  return (
    <div className={cls} data-rank={rankName}>
      {children}
    </div>
  )
}

Rank.propTypes = {
  rankName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Rank
