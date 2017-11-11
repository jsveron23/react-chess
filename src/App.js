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

  render () {
    const { inGame } = this.state

    return [
      <Header key="app-header">
        <h1>React Chess</h1>
      </Header>,
      <Main key="app-main">
        <Menu inGame={inGame} />
        <Board />
      </Main>
    ]
  }
}

export default App
