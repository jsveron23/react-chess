import React from 'react'
import { hot } from 'react-hot-loader'
import {
  LogoContainer,
  MenuContainer,
  TurnContainer,
  DiagramContainer,
  ScoreSheetContainer
} from '~/containers'
import { Main } from '~/components'
import '~/styles/app.css'

const App = () => {
  return (
    <Main>
      <LogoContainer />
      <MenuContainer />
      <TurnContainer />
      <DiagramContainer />
      <ScoreSheetContainer />
    </Main>
  )
}

export default hot(module)(App)
