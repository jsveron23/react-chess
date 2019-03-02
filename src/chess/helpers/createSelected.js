import { compose, join, of, prepend, curry } from 'ramda'
import { getSide } from '~/chess/helpers'

function createSelected (tile, turn) {
  return compose(
    join('-'),
    prepend(tile),
    of,
    getSide
  )(turn)
}

export default curry(createSelected)
