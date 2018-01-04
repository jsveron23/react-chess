import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import css from './rank.css'

const Rank = ({ children }) => (
  <div className={cx(css.rank, 'l-flex-row')}>{children}</div>
)

Rank.propTypes = {
  children: PropTypes.node.isRequired
}

export default Rank
