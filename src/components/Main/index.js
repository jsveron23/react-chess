import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import css from './Main.css'

const Main = ({ children }) => {
  const cls = cx(css.main, 'l-flex-middle', 'l-flex-col')

  return <main className={cls}>{children}</main>
}

Main.propTypes = {
  children: PropTypes.node.isRequired
}

export default Main
