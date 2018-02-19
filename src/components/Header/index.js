import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import css from './header.css'

const Header = ({ title }) => (
  <header className={cx(css.header, 'l-flex-center', 'l-flex-middle')}>
    <h1>{title}</h1>
  </header>
)

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header
