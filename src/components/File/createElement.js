import { createElement } from 'react'
import * as R from 'ramda'

// ignore third arg
export default R.curry((Element, props) => createElement(Element, props))
