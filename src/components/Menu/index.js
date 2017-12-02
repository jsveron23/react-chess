import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import css from './menu.css'

/**
 * Menu component
 * @param  {Object} props
 * @return {JSX}
 */
const Menu = ({ isPlaying, onClick }) => {
  const cls = cx(css.menu, {
    [css.menuMain]: !isPlaying,
    [css.menuGame]: isPlaying,
    'l-flex-row': isPlaying
  })
  const mainMenuItems = [
    <li key="main-menu-item">
      <a href="" data-action="main" onClick={onClick}>Menu</a>
    </li>,
    <li key="undo-menu-item">
      <a href="" data-action="undo" onClick={onClick}>Undo</a>
    </li>
  ]
  const gameMenuItems = [
    // <li key="1p-menu-item">
    //   <a href="" data-actions="1p" onClick={onClick}>New - Human vs. Computer</a>
    // </li>,
    <li key="2p-menu-item">
      <a href="" data-action="2p" onClick={onClick}>New - Human vs. Human</a>
    </li>
  ]

  return (
    <ul className={cls}>
      {
        isPlaying ? [...mainMenuItems] : [...gameMenuItems]
      }
    </ul>
  )
}

Menu.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Menu
