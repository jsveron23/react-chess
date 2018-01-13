import React from 'react'
import { hot } from 'react-hot-loader'
import { Header } from '@components'
import { Menu, Board, Records, Turn } from '@containers'
import '@styles/app.css'

/**
 * App Component
 * @return {JSX}
 */
const App = (props) => (
  <main style={{ flex: 1 }}>
    <Header title="React Chess" />
    <Menu />
    <Board />
    <Records />
    <Turn />
  </main>
)

const applyHot = hot(module)

export default applyHot(App)
