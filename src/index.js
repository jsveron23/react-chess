import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '@store'
import Chess from './Chess'

ReactDOM.render(
  <Provider store={store}>
    <Chess />
  </Provider>,
  document.getElementById('root')
)
