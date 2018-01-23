import React from 'react'
import { hot } from 'react-hot-loader'
import { Main, Header } from '@components'
import { Menu, Board, Records, Turn } from '@containers'
import '@styles/app.css'

/**
 * App Component
 * @return {JSX}
 */
const App = (props) => (
  <Main>
    <Header title="React Chess" />
    <Menu />
    <Board />
    <Records />
    <Turn />
  </Main>
)

const applyHot = hot(module)

export default applyHot(App)
