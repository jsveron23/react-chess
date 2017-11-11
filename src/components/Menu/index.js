import React from 'react'
import PropTypes from 'prop-types'

const Menu = ({ inGame }) => (
  <nav className="menu">
    {inGame ? <GameMenu /> : <MainMenu />}
  </nav>
)

Menu.propTypes = {
  inGame: PropTypes.bool
}
Menu.defaultProps = {
  inGame: false
}

const MainMenu = (props) => (
  <ul className="menu-main">
    <li>New - Human vs. Computer</li>
    <li>New - Human vs. Human</li>
  </ul>
)

const GameMenu = (props) => (
  <ul className="menu-game">
    <li>Main Manu</li>
    <li>Undo</li>
  </ul>
)

export default Menu
