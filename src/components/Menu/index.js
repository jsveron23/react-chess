import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import css from './menu.css'

/**
 * Menu component
 * @extends {React.PureComponent}
 */
class Menu extends PureComponent {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    setScreen: PropTypes.func,
    setCommand: PropTypes.func
  }

  static defaultProps = {
    setScreen: function () {},
    setCommand: function () {}
  }

  /**
   * Handles click a menu item
   * @param {Proxy} evt
   * @listens
   */
  handleClick = evt => {
    evt.preventDefault()

    const { setScreen, setCommand } = this.props
    const { target } = evt
    const action = target.getAttribute('data-action')

    switch (action) {
      case 'main': {
        setCommand('')
        setScreen(action)

        break
      }

      case '2p': {
        setCommand('')
        setScreen(action)

        break
      }

      case 'undo': {
        setCommand('undo')

        break
      }
    }
  }

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { isPlaying } = this.props
    const cls = cx(css.menu, {
      [css.menuMain]: !isPlaying,
      [css.menuGame]: isPlaying,
      'l-flex-row': isPlaying
    })

    return (
      <ul className={cls}>
        {isPlaying
          ? (
            <Fragment>
              <li>
                <a href="" data-action="main" onClick={this.handleClick}>Menu</a>
              </li>
              <li>
                <a href="" data-action="undo" onClick={this.handleClick}>Undo</a>
              </li>
            </Fragment>
          )
          : (
            <Fragment>
              <li>
                <a href="" data-action="2p" onClick={this.handleClick}>New - Human vs. Human</a>
              </li>
            </Fragment>
          )}
      </ul>
    )
  }
}

export default Menu
