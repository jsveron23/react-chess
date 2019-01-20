import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '~/store'
import App from '~/App'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

if (process.env.NODE_ENV === 'development') {
  const a11y = require('react-a11y').default

  a11y(React, ReactDOM)
}
