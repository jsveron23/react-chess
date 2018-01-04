import React, { Component } from 'react'
import { Header, Menu, Board } from '@components'

/**
 * Main component
 * @extends Component
 */
class Main extends Component {
  /**
   * @param {Object} props
   */
  constructor (props) {
    super(props)

    this.state = {
      action: 'main'
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
    const action = target.getAttribute('data-action')

    this.setState({ action })
  }

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { action } = this.state
    const actionsList = ['1p', '2p', 'undo']
    const isPlaying = actionsList.includes(action)

    return (
      <main style={{ flex: 1 }}>
        <Header>
          <h1>React Chess</h1>
        </Header>
        <Menu
          isPlaying={isPlaying}
          onClick={this.handleClick}
        />
        {
          isPlaying &&
            <Board action={action} />
        }
      </main>
    )
  }
}

export default Main
