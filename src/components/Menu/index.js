import React from 'react'
import cx from 'classnames'
import css from './menu.css'
// import PropTypes from 'prop-types'

const Menu = ({ inGame, onClick }) => {
  const cls = cx(css.menu, {
    [css.menuMain]: !inGame,
    [css.menuGame]: inGame,
    'l-flex-row': inGame
  })

  const items = inGame ? [
    <li key="back-to-main-menu"><a href="" data-type="back" onClick={onClick}>Menu</a></li>,
    <li key="undo"><a href="" data-type="undo" onClick={onClick}>Undo</a></li>
  ] : [
    // <li key="1p"><a href="" data-type="1p" onClick={onClick}>New - Human vs. Computer</a></li>,
    <li key="2p"><a href="" data-type="2p" onClick={onClick}>New - Human vs. Human</a></li>
  ]

  return <ul className={cls}>{items}</ul>
}

export default Menu
