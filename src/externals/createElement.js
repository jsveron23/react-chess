import { createElement } from 'react'
import * as R from 'ramda'

/**
 * Ignore third arg
 */
export default R.curry((Element, props) => createElement(Element, props))
