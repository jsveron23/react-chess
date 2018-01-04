import React from 'react'
import { hot } from 'react-hot-loader'
import { Header } from '@components'
import { Menu, Board, Records, Turn } from '@containers'
import '@styles/app.css'

/**
 * App Component
 * @extends {React.Component}
 */
const App = props => (
  <main style={{ flex: 1 }}>
    <Header title="React Chess" />
    <Menu />
    <Board />
    <Records />
    <Turn />
  </main>
)

export default hot(module)(App)
