import { curry, compose, split, flip, prop } from 'ramda'
import findCode from './findCode'
import _parseSelected from './internal/_parseSelected'

/**
 * Parse selected
 * @param  {string} selected
 * @param  {Array}  snapshot
 * @return {Object}
 */
function parseSelected (selected, snapshot) {
  const [side, piece, file, rank] = compose(
    split(''),
    flip(findCode)(snapshot),
    prop('tile'),
    _parseSelected
  )(selected)

  return { side, piece, file, rank }
}

export default curry(parseSelected)
