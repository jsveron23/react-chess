import React, { Component } from 'react'
import { Header, Main, Menu, Board } from '@components'
import '@styles/app.css'

/**
 * Entry point of ReactJS application
 * @extends {React.Component}
 */
class App extends Component {
  /**
   * App componeent
   * @param {Object} props
   */
  constructor (props) {
    super(props)

    this.state = {
      inGame: false,
      type: ''
    }
  }

  /**
   * Handles click a menu item
   * @param {Proxy} evt
   * @listens
   */
  handleClick = evt => {
    evt.preventDefault()

    const { target } = evt
    const type = target.getAttribute('data-type')
    const isInGame = {
      '1p': true,
      '2p': true,
      'back': false,
      'undo': true
    }

    this.setState({
      inGame: isInGame[type],
      type
    })
  }

  /**
   * Render
   * @return {JSX}
   */
  render () {
    const { inGame, type } = this.state

    return [
      <Header key="app-header">
        <h1>React Chess</h1>
      </Header>,
      <Main key="app-main">
        <Menu inGame={inGame} onClick={this.handleClick} />
        {inGame && <Board actions={type} />}
      </Main>
    ]
  }
}

export default App
