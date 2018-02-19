import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import css from './menu.css'

const Item = ({ action, text, onClick }) => (
  <li>
    <a href="" data-action={action} onClick={onClick}>{text}</a>
  </li>
)

Item.propTypes = {
  action: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

Item.defaultProps = {
  onClick: function () {}
}

const Menu = ({ isPlaying, onClick }) => (
  <ul className={cx(css.menu, {
    [css.menuMain]: !isPlaying,
    [css.menuGame]: isPlaying,
    'l-flex-row': isPlaying
  })}>
    {isPlaying
      ? (
        <Fragment>
          <Item action="main" text="Menu" onClick={onClick} />
          <Item action="undo" text="Undo" onClick={onClick} />
        </Fragment>
      )
      : (
        <Fragment>
          <Item action="2p" text="New - Human vs. Human" onClick={onClick} />
        </Fragment>
      )}
  </ul>
)

Menu.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onClick: PropTypes.func
}

Menu.defaultProps = {
  onClick: function () {}
}

export default Menu
