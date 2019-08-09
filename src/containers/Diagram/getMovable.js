import memoize from 'memoize-one'
import * as R from 'ramda'
import { getNextMovable } from '~/chess/core'
import { lazy } from '~/utils'

// no extra rendering when clicking same Chess piece
const getMovable = R.compose(
  getNextMovable('tiles'),
  lazy
)

export default memoize(getMovable, R.equals)
