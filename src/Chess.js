import React from 'react'
import { hot } from 'react-hot-loader'
import {
  Main,
  Header
} from '@components'
import {
  Menu,
  Board,
  Records
} from '@containers'
import '@styles/app.css'

const Chess = () => (
  <Main>
    <Header title="React Chess" />
    <Menu />
    <Board />
    <Records />
  </Main>
)

const applyHot = hot(module)

export default applyHot(Chess)
