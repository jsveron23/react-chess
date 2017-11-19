import React, { PureComponent } from 'react'
import { Header, Main, Menu, Board } from '@components'
import '@styles/app.css'

/**
 * Entry point of ReactJS application
 * @extends {React.PureComponent}
 */
class App extends PureComponent {
  /**
   * App componeent
   * @param {Object} props
   */
  constructor (props) {
    super(props)

    this.state = {
      inGame: false
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
      'back': false
    }

    this.setState({
      inGame: isInGame[type]
    })
  }

  /**
   * Render
   * @return {JSX}
   */
  render () {
    const { inGame } = this.state

    return [
      <Header key="app-header">
        <h1>React Chess</h1>
      </Header>,
      <Main key="app-main">
        <Menu inGame={inGame} onClick={this.handleClick} />
        {inGame && <Board />}
      </Main>
    ]
  }
}

export default App
