import React from 'react'
import cx from 'classnames'
import css from './header.css'
// import PropTypes from 'prop-types'

const Header = ({ children }) => (
  <header className={cx(css.header, 'l-flex-middle')}>{children}</header>
)

export default Header
