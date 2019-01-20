import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import css from './Rank.css'

const Rank = ({ children }) => {
  const cls = cx(css.rank, 'l-flex-row')

  return <div className={cls}>{children}</div>
}

Rank.propTypes = {
  name: PropTypes.string.isRequired
}

export default Rank
