import React, { PureComponent } from 'react'
import { Header, Main, Menu, Board } from '@components'
import '@styles/app.css'

class App extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      inGame: false
    }
  }

  handleClick = evt => {
    evt.preventDefault()

    const { target } = evt
    const type = target.getAttribute('data-type')
    const state = {}

    switch (type) {
      case '1p': {
        state.inGame = true

        break
      }

      case '2p': {
        state.inGame = true

        break
      }

      case 'back': {
        state.inGame = false

        break
      }

      case 'undo': {
        //

        break
      }
    }

    this.setState(state)
  }

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
