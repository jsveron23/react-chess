import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import css from './rank.css'

const Rank = ({ name, file, children }) => (
  <div className={cx(css.rank, 'l-flex-row')} data-rank={name}>
    {children}
  </div>
)

Rank.propTypes = {
  name: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
}

export default Rank
